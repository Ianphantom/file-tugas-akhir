<?php

namespace App\Models;

use CodeIgniter\Model;

class PerizinanModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'perizinan';
    protected $primaryKey       = 'id_perizinan';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['id_perizinan', 'uuid_petugas_rs', 'uuid_pasien', 'keterangan', 'tanggal_pembuatan', 'durasi', 'alasan', 'akses', 'status'];

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

    public function listPerizinanPetugasRs($id = null){
        $query = "
        SELECT perizinan.* , pasien.nama_lengkap, pasien.nomor_bpjs FROM perizinan 
        INNER JOIN pasien ON perizinan.uuid_pasien=pasien.uuid
        WHERE perizinan.uuid_petugas_rs='".$id."'";

        $res = $this->db->query($query);
        return $res->getResult();
    }

    public function detailPerizinanPasien($id = null){
        $query = "
        SELECT perizinan.*, COALESCE(dokter.nama_lengkap, admin.nama_lengkap) AS nama_lengkap 
        FROM perizinan 
        INNER JOIN petugas_rs on perizinan.uuid_petugas_rs=petugas_rs.uuid 
        LEFT JOIN admin on admin.uuid=perizinan.uuid_petugas_rs 
        LEFT JOIN dokter on dokter.uuid=perizinan.uuid_petugas_rs 
        where uuid_pasien='".$id."'";

        $res = $this->db->query($query);
        return $res->getResult();
    }
}
