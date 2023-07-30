<?php

namespace App\Models;

use CodeIgniter\Model;

class PetugasRSModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'petugas_rs';
    protected $primaryKey       = '	id_petugas_rs ';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ["id_petugas_rs", "uuid", "id_klinik", "id_roles", "status", "username", "password"];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    function getAllPetugas(){
        $query = "
            SELECT petugas_rs.uuid, petugas_rs.id_roles, 
            CASE 
                WHEN petugas_rs.id_roles = 'dokter' THEN dokter.nama_lengkap 
                WHEN petugas_rs.id_roles = 'admin' THEN admin.nama_lengkap 
                ELSE NULL 
            END AS nama_lengkap 
            FROM petugas_rs 
            LEFT JOIN dokter ON petugas_rs.uuid = dokter.uuid AND petugas_rs.id_roles = 'dokter' 
            LEFT JOIN admin ON petugas_rs.uuid = admin.uuid AND petugas_rs.id_roles = 'admin';        
        ";

        $res = $this->db->query($query);
        return $res->getResult();
    }

    function getAllPetugasKlinik($id_klinik = null){
        $query = "
            SELECT petugas_rs.uuid, petugas_rs.id_roles, 
            CASE 
                WHEN petugas_rs.id_roles = 'dokter' THEN dokter.nama_lengkap 
                WHEN petugas_rs.id_roles = 'admin' THEN admin.nama_lengkap 
                ELSE NULL 
            END AS nama_lengkap 
            FROM petugas_rs 
            LEFT JOIN dokter ON petugas_rs.uuid = dokter.uuid AND petugas_rs.id_roles = 'dokter' 
            LEFT JOIN admin ON petugas_rs.uuid = admin.uuid AND petugas_rs.id_roles = 'admin'
            WHERE id_klinik = ".$id_klinik.";
        ";

        $res = $this->db->query($query);
        return $res->getResult();
    }
}
