<?php

namespace App\Models;

use CodeIgniter\Model;

class RekamMedisModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'rekam_medis';
    protected $primaryKey       = 'id_rekam_medis';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['id_rekam_medis', 'uuid_pasien', 'uuid_petugas_rs', 'nomor_pencatatan_blockchain', 'tanggal_pembuatan'];

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

    public function getRekamMedisPatient($id = null){
        $query = "SELECT rekam_medis.*, COALESCE(dokter.nama_lengkap, admin.nama_lengkap) AS nama_lengkap, nama_klinik FROM rekam_medis INNER JOIN petugas_rs on rekam_medis.uuid_petugas_rs=petugas_rs.uuid INNER JOIN klinik on petugas_rs.id_klinik=klinik.id_klinik LEFT JOIN admin on admin.uuid=rekam_medis.uuid_petugas_rs LEFT JOIN dokter on dokter.uuid=rekam_medis.uuid_petugas_rs where uuid_pasien='".$id."'";
        $res = $this->db->query($query);
        return $res->getResult();
    }
}
