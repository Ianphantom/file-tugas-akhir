-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2023 at 06:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `satusehat`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `nama_lengkap` text NOT NULL,
  `alamat_email` text NOT NULL,
  `public_key` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `uuid`, `nama_lengkap`, `alamat_email`, `public_key`) VALUES
(1, '3b8171a4-3105-4339-936c-efc4560ef47f', 'Admin ITS Medical Center', 'its@gmail.com', 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEVfLlDnxotAgPEYXJ3XtFz4II\nvStiNDPhIViQycKExSF7FqIRXy6I7PcXOI/eGrPxbKuORL/D2eqXCZeS8I5CMjXz\nTMV61R9LGTzuVzX8eEqcqgXiIRqepkCQvkMWgswfKrtG9UTPpAcwHoqlIcYJCB62\nsOr20e5wx/YKQNExoQIDAQAB');

-- --------------------------------------------------------

--
-- Table structure for table `dokter`
--

CREATE TABLE `dokter` (
  `id_dokter` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `nama_lengkap` text NOT NULL,
  `nomor_npa` text NOT NULL,
  `alamat_email` text NOT NULL,
  `nomor_telepon` text DEFAULT NULL,
  `public_key` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `klinik`
--

CREATE TABLE `klinik` (
  `id_klinik` int(11) NOT NULL,
  `nama_klinik` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `klinik`
--

INSERT INTO `klinik` (`id_klinik`, `nama_klinik`) VALUES
(1, 'ITS Medical Center');

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `id_pasien` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `alamat_email` text NOT NULL,
  `nama_lengkap` text NOT NULL,
  `nomor_bpjs` text NOT NULL,
  `nomor_nik` text DEFAULT NULL,
  `nomor_telepon` text DEFAULT NULL,
  `public_key` text DEFAULT NULL,
  `signature_key` text DEFAULT NULL,
  `password` text NOT NULL,
  `tanggal_pembuatan` date NOT NULL DEFAULT current_timestamp(),
  `tanggal_update` date NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perizinan`
--

CREATE TABLE `perizinan` (
  `id_perizinan` int(11) NOT NULL,
  `uuid_petugas_rs` text NOT NULL,
  `uuid_pasien` text NOT NULL,
  `keterangan` text NOT NULL,
  `tanggal_pembuatan` date NOT NULL DEFAULT current_timestamp(),
  `durasi` int(11) NOT NULL,
  `alasan` text NOT NULL,
  `akses` text NOT NULL,
  `status` text NOT NULL DEFAULT 'Menunggu Persetujuan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `petugas_rs`
--

CREATE TABLE `petugas_rs` (
  `id_petugas_rs` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `id_klinik` int(11) NOT NULL,
  `id_roles` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `petugas_rs`
--

INSERT INTO `petugas_rs` (`id_petugas_rs`, `uuid`, `id_klinik`, `id_roles`, `status`, `username`, `password`) VALUES
(1, '3b8171a4-3105-4339-936c-efc4560ef47f', 1, 'admin', 0, 'adminITS', '$2a$12$IB9fMfeUQ4OGLJNE1iDmeuQ6GjVwZpEOClFa07CQNawf86YpTin1G');

-- --------------------------------------------------------

--
-- Table structure for table `rekam_medis`
--

CREATE TABLE `rekam_medis` (
  `id_rekam_medis` int(11) NOT NULL,
  `uuid_pasien` text NOT NULL,
  `uuid_petugas_rs` text NOT NULL,
  `nomor_pencatatan_blockchain` text NOT NULL,
  `tanggal_pembuatan` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_roles` int(11) NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_roles`, `keterangan`) VALUES
(1, 'admin'),
(2, 'dokter');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `dokter`
--
ALTER TABLE `dokter`
  ADD PRIMARY KEY (`id_dokter`);

--
-- Indexes for table `klinik`
--
ALTER TABLE `klinik`
  ADD PRIMARY KEY (`id_klinik`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id_pasien`);

--
-- Indexes for table `perizinan`
--
ALTER TABLE `perizinan`
  ADD PRIMARY KEY (`id_perizinan`);

--
-- Indexes for table `petugas_rs`
--
ALTER TABLE `petugas_rs`
  ADD PRIMARY KEY (`id_petugas_rs`);

--
-- Indexes for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD PRIMARY KEY (`id_rekam_medis`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_roles`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dokter`
--
ALTER TABLE `dokter`
  MODIFY `id_dokter` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `klinik`
--
ALTER TABLE `klinik`
  MODIFY `id_klinik` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id_pasien` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perizinan`
--
ALTER TABLE `perizinan`
  MODIFY `id_perizinan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `petugas_rs`
--
ALTER TABLE `petugas_rs`
  MODIFY `id_petugas_rs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  MODIFY `id_rekam_medis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_roles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
