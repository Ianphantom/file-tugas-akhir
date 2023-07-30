<?php

namespace App\Models;

use CodeIgniter\Model;

class PasienModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'pasien';
    protected $primaryKey       = 'id_pasien';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['uuid', 'alamat_email', 'nama_lengkap', 'nomor_bpjs', 'nomor_nik', 'nomor_telepon', 'public_key', 'signature_key', 'password', 'tanggal_pembuatan', 'tanggal_update', 'status'];

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
}
