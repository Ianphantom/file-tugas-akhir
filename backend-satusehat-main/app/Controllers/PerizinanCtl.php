<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\PerizinanModel;
use App\Models\PetugasRSModel;
use App\Models\DokterModel;
use App\Models\PasienModel;
use App\Controllers\PetugasRSCtl;

class PerizinanCtl extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */

    use ResponseTrait;
    public function index()
    {
        //

        $perizinanModel = new PerizinanModel();
        $dataPerizinan = $perizinanModel->detailPerizinanPasien($this->request->id_requester);
        return $this->respond($dataPerizinan);
    }

    public function petugasRS_index(){
        $perizinanModel = new PerizinanModel();
        $dataPerizinan = $perizinanModel->listPerizinanPetugasRs($this->request->id_requester);
        return $this->respond($dataPerizinan);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */

    public function show($id = null)
    {
        //
        helper(['curl']);
        $petugasController = new PetugasRSCtl();
        $perizinanModel = new PerizinanModel();
        $dataPerizinan  = $perizinanModel->where('id_perizinan', $id)->first();
        $output =  $petugasController->getPetugasData($dataPerizinan['uuid_petugas_rs']);

        $data = [
            "data_perizinan" => $dataPerizinan,
            "data_pengaju" => $output
        ];
        return $this->respond($data);
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        //
        helper(['form']);
        $rules = [
            'uuid_petugas_rs' => 'required',
            'uuid_pasien' => 'required',
            'keterangan' => 'required',
            'durasi' => 'required|is_numeric',
            'alasan' => 'required',
            'akses' => 'required',
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        $data = [
            'uuid_petugas_rs' => $this->request->getVar('uuid_petugas_rs'),
            'uuid_pasien' => $this->request->getVar('uuid_pasien'),
            'keterangan' => $this->request->getVar('keterangan'),
            'durasi' => $this->request->getVar('durasi'),
            'alasan' => $this->request->getVar('alasan'),
            'akses' => $this->request->getvar('akses')
        ];

        $perizinanModel = new PerizinanModel();
        $registered = $perizinanModel->save($data);

        if($registered) {
            return $this->respondCreated($registered);
        }else{
            return $this->fail($registered);
        }

    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        //
        $perizinanModel = new PerizinanModel();
        $petugasRsModel = new PetugasRSModel();
        $dokterModel = new DokterModel();

        helper(['form']);
        $rules = [
            'uuid_petugas_rs' => 'required',
            'uuid_pasien' => 'required',
            'status' => 'required',
            'timeStart' => 'required',
            'timeExp' => 'required'
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        

        // check if valid request
        $dataPerizinan = $perizinanModel->where("id_perizinan", $id)->first();
        if($dataPerizinan["uuid_petugas_rs"] != $this->request->getVar('uuid_petugas_rs') || $dataPerizinan["uuid_pasien"] != $this->request->getVar('uuid_pasien')){
            return $this->failForbidden("You are Not Authorized to do this");
        }

        //updating the data
        $data = [
            'status' => $this->request->getVar('status')
        ];
        $perizinanModel->update($id, $data);

        if(strcmp("Akses Diberikan", $this->request->getVar('status')) !== 0){
            return $this->respond(["messege" => "Status Akses Berhasil diubah"]);
        }

        //process to input blockchain

        // pencarian signature key pasien
        $pasienModel = new PasienModel();
        $dataPasien = $pasienModel->select("signature_key")->where('uuid', $this->request->getVar('uuid_pasien'))->first();

        $dataPetugasRS = $petugasRsModel
                            ->join('klinik', 'petugas_rs.id_klinik = klinik.id_klinik', 'inner')
                            ->where("uuid", $this->request->getVar('uuid_petugas_rs'))
                            ->first();

        $userRoles = $dataPetugasRS['id_roles'];
        $public_key = '';
        if(strcmp($userRoles, "dokter") == 0){
            $dataDokter = $dokterModel
                            ->where("uuid", $this->request->getVar('uuid_petugas_rs'))
                            ->first();
            $public_key = $dataDokter['public_key'];
        }else if(strcmp($userRoles, "admin") == 0){
            $adminModel = new AdminModel();
            $dataAdmin = $adminModel->where("uuid", $this->request->getVar('uuid_petugas_rs'))->first();
            $public_key = $dataAdmin['public_key'];
        }

        $dataSendToBlockchain = [
            "jenisTransaksi" => "1",
            "data" => [
                "doctorId" => $this->request->getVar("uuid_petugas_rs"),
                "pasienId" => $this->request->getVar("uuid_pasien"),
                "doctorPublicKey" => $public_key,
                "signaturekey" => $this->request->getVar("newSignatureKey"),
                "timeStart" => $this->request->getVar('timeStart'),
                "timeExp" =>   $this->request->getVar('timeExp'),
                "permisssionLevel" => $dataPerizinan['akses'],
            ]
        ];


        $curl = curl_init();
        curl_setopt_array($curl, array(
        // CURLOPT_URL => 'http://'.getenv("BLOCKCHAIN_NETWORK").'/transaction/broadcast',
        CURLOPT_URL => 'http://'.getenv("BLOCKCHAIN_NETWORK").'/transaction/broadcast',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($dataSendToBlockchain),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Authorization: Bearer '.getenv("TOKEN_ACCESS").''
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $dataSendToBlockchain['messege'] = "Status Perizinan Berhasil Diubah";
        return $this->respond($dataSendToBlockchain);

    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //
    }
}
