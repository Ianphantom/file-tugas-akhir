<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\RekamMedisModel;

class RekamMedisCtl extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */

    use ResponseTrait;
    public function index($id = null)
    {
        //
        $rekamMedisModel = new RekamMedisModel();
        $dataRekamMedis = $rekamMedisModel->getRekamMedisPatient($id);
        return $this->respond($dataRekamMedis);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
        $rekamMedisModel = new RekamMedisModel();
        $dataRekamMedis = $rekamMedisModel->where('nomor_pencatatan_blockchain', $id)->first();
        if($dataRekamMedis['uuid_pasien'] != $this->request->id_requester){
            $this->failForbidden($this->request->id_requester);
        }

        $data = [
            'publicKey' => $this->request->public_key
        ];

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://'.getenv("BLOCKCHAIN_NETWORK").'/medicalrecord-specific/'.$id.'',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => array(
              'Content-Type: application/json',
              'Authorization: Bearer '.getenv("TOKEN_ACCESS").''
            ),
          ));

        $response = json_decode(curl_exec($curl));
        curl_close($curl);


        return $this->respond($response);
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
        helper(['form']);

        $rules = [
            'doctorId' => 'required',
            'pasienId' => 'required',
            'rme' => 'required'
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        
        $data = [
            'jenisTransaksi' => "2",
            "data" => [
                'doctorId' => $this->request->getVar('doctorId'),
                'pasienId' => $this->request->getVar('pasienId'),
                'rme' => $this->request->getVar('rme')
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
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'Authorization: Bearer '.getenv("TOKEN_ACCESS").''
            ),
        ));

        $response = json_decode(curl_exec($curl));
        curl_close($curl);
        $transactionId = $response->theNewTransaction->transactionId;
        
        $dataSendToDb = [
            'uuid_pasien' => $this->request->getVar('pasienId'),
            'uuid_petugas_rs' => $this->request->getVar('doctorId'),
            'nomor_pencatatan_blockchain' => $transactionId,
        ];

        $rekamMedisModel = new RekamMedisModel();
        $registered = $rekamMedisModel->save($dataSendToDb);
        return $this->respond($registered);
    }

    public function getPatientRME($id = null){
        $curl = curl_init();
        curl_setopt_array($curl, array(
            // CURLOPT_URL => 'http://'.getenv("BLOCKCHAIN_NETWORK").'/transaction/broadcast',
            CURLOPT_URL => 'http://'.getenv("BLOCKCHAIN_NETWORK").'/permission/'.$this->request->id_requester.'/'.$id.'',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'Authorization: Bearer '.getenv("TOKEN_ACCESS").''
            ),
        ));

        $response = json_decode(curl_exec($curl));
        curl_close($curl);

        if($response->permissionLevel < 1) return $this->failForbidden("You are Not Authorized to do this");

        return $this->respond($response);
    }

    public function getPatientListRME($id = null){
        $curl = curl_init();
        curl_setopt_array($curl, array(
            // CURLOPT_URL => 'http://'.getenv("BLOCKCHAIN_NETWORK").'/transaction/broadcast',
            CURLOPT_URL => 'http://'.getenv("BLOCKCHAIN_NETWORK").'/medicalrecord/'.$this->request->id_requester.'/'.$id.'',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'Authorization: Bearer '.getenv("TOKEN_ACCESS").''
            ),
        ));

        $response = json_decode(curl_exec($curl));
        $status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if($status_code != 200) return $this->failForbidden("You are Not Authorized to do this");

        return $this->respond($response);
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
