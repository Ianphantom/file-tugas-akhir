<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\DokterModel;
use Ramsey\Uuid\Uuid;


class DokterCtl extends ResourceController
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
        $dokterModel = new DokterModel();
        $listDokter = $dokterModel->findAll();

        $data = array();

        foreach($listDokter as $dokter){
            $dataSementara = [
                "uuid" => $dokter['uuid'],
                "nama_lengkap" => $dokter['nama_lengkap'],
                "nomor_npa" => $dokter['nomor_npa'],
                "alamat_email" => $dokter['alamat_email'],
            ];
            array_push($data, $dataSementara);
        }

        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //

        $dokterModel = new DokterModel();
        $dataDokter = $dokterModel->getWhere(['uuid' => $id] )->getResult();
        return $this->respond($dataDokter);
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
            'alamat_email' => 'required|valid_email|is_unique[dokter.alamat_email]',
            'nomor_npa' => 'required',
            'nama_lengkap' => 'required',
        ];

        if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        $data = [
            'nama_lengkap' => $this->request->getVar('nama_lengkap'),
            'uuid' => $uuid = Uuid::uuid4()->toString(),
            'nomor_npa' => $this->request->getVar('nomor_npa'),
            'alamat_email' => $this->request->getVar('alamat_email'),
            'public_key' => $this->request->getVar('public_key')
        ];

        $dokterModel = new DokterModel();

        $registered = $dokterModel->save($data);
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
