function dummyData() {
  return {
    nama: "Ian Felix Jonathan S",
    tanggal: "1 January 2023",
    waktu: "15:00 WIB",
    rumah_sakit: "Klinik ITS Medical Center",
    umur: "20 Tahun",
    keluhan: "Panas tinggi, pegel linu, sedikit sesak banyak batuknya",
    riwayat_kesehatan:
      "Pasien pernah menderita hipertensi selama 5 tahun terakhir, kontrol terakhir 3 bulan yang lalu, dan menggunakan obat hipertensi secara teratur.",
    riwayat_alergi: [
      {
        jenis_alergi: "udang",
      },
    ],
    riwayat_penyakit: [
      {
        jenis_penyakit: "Leukimia",
      },
      {
        jenis_penyakit: "Diabetes",
      },
      {
        jenis_penyakit: "Asma",
      },
    ],
    pemeriksaan_fisik: {
      tekanan_darah: "150/90 mmHg",
      pemeriksaan_kepala_dan_leher: "Tidak ditemukan kelainan",
      pemeriksaan_sistem_saraf_pusat: "Tidak ditemukan kelainan",
    },
    diagnosa: [
      {
        diagnosa: "hipertensi grade 2",
      },
      {
        diagnosa: "sakit kepala tension type",
      },
    ],
    tindakan: [
      {
        nama_prosedur: "terapi obat hipertensi dengan amlodipin 5 mg sehari",
      },
      {
        nama_prosedur:
          "terapi analgesik dengan paracetamol 500 mg 3x sehari selama 14 hari",
      },
    ],
    pengobatan: [
      {
        namaObat: "amlodipin",
        lama: "14 hari",
        catatan: "3 x 1 Sesudah Makan",
      },
      {
        namaObat: "Paracetamol",
        lama: "14 hari",
        catatan: "3 x 1 Sesudah Makan",
      },
      {
        namaObat: "Paracetamol",
        lama: "14 hari",
        catatan: "3 x 1 Sesudah Makan",
      },
    ],
    rencana_tindak_lanjut: [
      {
        rencana: "kontrol tekanan darah dalam 1 minggu ke depan",
      },
      {
        rencana:
          "jika keluhan sakit kepala masih berlanjut, diharapkan kembali berkonsultasi dengan dokter",
      },
    ],
    catatan_tambahan: [
      {
        catatan: "Pasien diminta untuk menjaga pola makan dan olahraga teratur",
      },
      {
        catatan:
          "pasien diminta untuk mengurangi komsumsi garam dan minuman beralkohol",
      },
      {
        catatan: "Pasien diminta untuk memeriksa tekanan darah secara berkala",
      },
    ],
  };
}
export default dummyData;
