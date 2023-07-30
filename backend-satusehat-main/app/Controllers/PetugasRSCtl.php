<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\PetugasRSModel;
use App\Models\DokterModel;
use App\Models\AdminModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class PetugasRSCtl extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        //
        $petugasRSModel = new PetugasRSModel();
        $dataPetugasRS = $petugasRSModel->getAllPetugas();
        return $this->respond($dataPetugasRS);
    }

    public function petugasKlinik($id = null){
        $petugasRSModel = new PetugasRSModel();
        $dataPetugasRS = $petugasRSModel->getAllPetugasKlinik($id);
        return $this->respond($dataPetugasRS);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */

    public function show($id = null)
    {
        //
        $petugasRSModel = new PetugasRSModel();
        $dokterModel = new DokterModel();
        $dataPetugasRS = $petugasRSModel
                            ->join('klinik', 'petugas_rs.id_klinik = klinik.id_klinik', 'inner')
                            ->where("uuid", $id)
                            ->first();
        
        if(!$dataPetugasRS) return $this->failNotFound('User Not Found');

        $userRoles = $dataPetugasRS['id_roles'];
        $data = array();
        if(strcmp($userRoles, "dokter") == 0){
            $dataDokter = $dokterModel
                            ->where("uuid", $id)
                            ->first();
            $dataDokter['nama_klinik'] = $dataPetugasRS['nama_klinik'];
            array_push($data, $dataDokter);
        }else if(strcmp($userRoles, "admin") == 0){
            $adminModel = new AdminModel();

            $dataAdmin = $adminModel->where("uuid", $id)->first();
            $dataAdmin['nama_klinik'] = $dataPetugasRS['nama_klinik'];
            array_push($data, $dataAdmin);
        }
        return $this->respond($data);
    }

    public function getPetugasData($id = null)
    {
        //
        $petugasRSModel = new PetugasRSModel();
        $dokterModel = new DokterModel();
        $dataPetugasRS = $petugasRSModel
                            ->join('klinik', 'petugas_rs.id_klinik = klinik.id_klinik', 'inner')
                            ->where("uuid", $id)
                            ->first();
        
        if(!$dataPetugasRS) return ['messege' => "user not found"];

        $userRoles = $dataPetugasRS['id_roles'];
        $data = array();
        if(strcmp($userRoles, "dokter") == 0){
            $dataDokter = $dokterModel
                            ->where("uuid", $id)
                            ->first();
            $dataDokter['nama_klinik'] = $dataPetugasRS['nama_klinik'];
            array_push($data, $dataDokter);
        }else if(strcmp($userRoles, "admin") == 0){
            $adminModel = new AdminModel();

            $dataAdmin = $adminModel->where("uuid", $id)->first();
            $dataAdmin['nama_klinik'] = $dataPetugasRS['nama_klinik'];
            array_push($data, $dataAdmin);
        }
        return $data;
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

        $key = getenv("TOKEN_SECRET");
        $header = $this->request->getServer('HTTP_AUTHORIZATION');
        $token = explode(" ", $header)[1];
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        if($decoded->klinik !== $this->request->getVar('id_klinik')) return $this->failForbidden("Forbidden Action! Make sure you only add doctor to your hospital!");


        helper(['form']);

        $rules = [
            'uuid' => 'required',
            'id_klinik' => 'required',
            'id_roles' => 'required',
            'username' => 'required|min_length[8]|is_unique[petugas_rs.username]',
            'password' => 'required|min_length[6]',
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        $data = [
            'uuid' => $this->request->getVar('uuid'),
            'id_klinik' => $this->request->getVar('id_klinik'),
            'id_roles' => $this->request->getVar('id_roles'),
            'username' => $this->request->getVar('username'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT)
        ];

        $petugasRSModel =  new PetugasRSModel();
        $registered = $petugasRSModel->save($data);

        return $this->respondCreated($registered);
    }

    public function login(){
        helper(['form']);

        $rules = [
            'username' => 'required',
            'password' => 'required'
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        $petugasModel = new PetugasRSModel();

        $petugasRs = $petugasModel->where('username', $this->request->getVar('username'))->first();
        if(!$petugasRs) return $this->failNotFound("Username Not Found");

        $verify = password_verify($this->request->getVar('password'), $petugasRs['password']);
        if(!$verify) return $this->fail("Wrong Password");

        function userPermissionLevel($roles){
            if(strcmp($roles, "admin") == 0){
                return 3;
            }else if(strcmp($roles, "dokter")==0){
                return 2;
            }
            return 0;
        }

        $userRoles = $petugasRs['id_roles'];
        $public_key = '';
        if(strcmp($userRoles, "dokter") == 0){
            $dokterModel = new DokterModel();
            $dataDokter = $dokterModel
                            ->where("uuid", $petugasRs['uuid'])->first();
            $public_key = $dataDokter['public_key'];
        }else if(strcmp($userRoles, "admin") == 0){
            $adminModel = new AdminModel();
            $dataAdmin = $adminModel->where("uuid", $petugasRs['uuid'])->first();
            $public_key = $dataAdmin['public_key'];
        }

        $key = getenv("TOKEN_SECRET");
        $payload = array(
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "uid" => $petugasRs['uuid'],
            'roles' => strtolower($petugasRs['id_roles']),
            'klinik' => $petugasRs['id_klinik'],
            'public_key' => $public_key,
            'permission_level' => userPermissionLevel($petugasRs['id_roles']),
        );
        $token = JWT::encode($payload, $key, 'HS256');

        $response = [
            'status' => 200,
            'data' => [
                'token' => $token,
            ]
        ];

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
