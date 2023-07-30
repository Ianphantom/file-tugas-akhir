<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\PasienModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Ramsey\Uuid\Uuid;

class PasienCtl extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */

    use ResponseTrait;
    public function index()
    {
        // ini butuh permission level 2
        $pasienModel = new PasienModel();

        $dataAllPasien = $pasienModel->findAll();

        $data = array();
        foreach($dataAllPasien as $dataPasien){
            $datasementara = [
                "uuid" => $dataPasien["uuid"],
                "alamat_email" =>  $dataPasien["alamat_email"],
                "nama_lengkap" => $dataPasien["nama_lengkap"],
                "nomor_bpjs" => $dataPasien["nomor_bpjs"],
            ];
            array_push($data, $datasementara);
        }
        return $this->respond($data);

    }

    public function login(){
        helper(['form']);
        $rules = [
            'alamat_email' => 'required|valid_email',
            'password' => 'required', 
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        $pasienModel = new PasienModel();

        $pasien = $pasienModel->where("alamat_email", $this->request->getVar("alamat_email"))->first();
        if(!$pasien) return $this->failNotFound("Email Not Found");

        // 

        $verify = password_verify($this->request->getVar('password'), $pasien['password']);
        if(!$verify) return $this->fail("Wrong Password");

        $key = getenv("TOKEN_SECRET");
        $payload = array(
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "uid" => $pasien['uuid'],
            "email" => $pasien['alamat_email'],
            'nama_lengkap' => $pasien['nama_lengkap'],
            'nomor_bpjs' => $pasien['nomor_bpjs'],
            'nomor_telepon' => $pasien['nomor_telepon'],
            'roles' => "pasien",
            'signature_key' => $pasien['signature_key'],
            'public_key' => $pasien['public_key'],
            'permission_level' => "1",
        );

        $token = JWT::encode($payload, $key, 'HS256');
        $response = [
            "status" => 200,
            "data" => [
                "token" => $token,
            ]
        ];

        return $this->respond($response);


    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
        $model = new PasienModel();
        $userProfile = $model->getWhere(['uuid' => $id])->getResult();
        if($userProfile){
            //Decode Token
            $key = getenv("TOKEN_SECRET");
            $header = $this->request->getServer('HTTP_AUTHORIZATION');
            $token = explode(" ", $header)[1];
            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            // Cek if the user is the same
            if(strcmp($decoded->uid, $id) !== 0 && $decoded->permission_level <= 1){
                $data = [
                    "uuid" => $userProfile[0]->uuid,
                    "alamat_email" =>  $userProfile[0]->alamat_email,
                    "nama_lengkap" => $userProfile[0]->nama_lengkap,
                    "public_key" => $userProfile[0]->public_key,
                    "signature_key" => $userProfile[0]->signature_key,
                ];
                return $this->respond($data);
            }
            return $this->respond($userProfile);
        }else{
            return $this->failNotFound("Cannot Find User Data");
        }
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
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: X-API-KEY, Origin,X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS"){
            die();
        }
        helper(['form']);

        $rules = [
            'alamat_email' => 'required|valid_email|is_unique[pasien.alamat_email]',
            'password'=> 'required|min_length[6]',
            'confPassword'=> 'matches[password]',
            'bpjs' => 'required',
            'nama_lengkap' => 'required',
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        $data = [
            'alamat_email' => $this->request->getVar('alamat_email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'nomor_bpjs' => $this->request->getVar('bpjs'),
            'nama_lengkap' => $this->request->getVar('nama_lengkap'),
            'uuid' => $uuid = Uuid::uuid4()->toString(),
            'public_key' => $this->request->getVar('public_key')
        ];

        $model = new PasienModel();
        $registered = $model->save($data);

        // $to = $this->request->getVar('alamat_email');
        // $namaLengkap = $this->request->getVar('nama_lengkap');
        // $link = "https://ianfelix.my.id";
        // $privateKey = $this->request->getVar('private_key');

        // $command = 'php emailVerification.php "'.$to.'" "'.$namaLengkap.'" "'.$link.'" "'.$privateKey.'" '; // Replace with your desired terminal command
        // $output = system($command);

        return $this->respondCreated($registered);     
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
        $model = new PasienModel();
        $userProfile = $model->getWhere(['uuid' => $id])->getResult();
        if($userProfile){
            //Decode Token
            $key = getenv("TOKEN_SECRET");
            $header = $this->request->getServer('HTTP_AUTHORIZATION');
            $token = explode(" ", $header)[1];
            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            // Cek if the user is the same
            if(strcmp($decoded->uid, $id) !== 0 && $decoded->permission_level <= 1){
                return $this->failNotFound("Cannot Modify User Data");
            }
        }else{
            return $this->failNotFound("Cannot Find User Data");
        }


        $json = $this->request->getBody();
        $data_update = json_decode($json);
        $model->update($userProfile[0]->id_pasien, $data_update);
        return $this->respond(["messege" => "Data Has Been Updated"]);
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
