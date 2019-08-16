-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2019 at 09:11 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arphat`
--

-- --------------------------------------------------------

--
-- Table structure for table `mobil`
--

CREATE TABLE `mobil` (
  `no_mobil` int(10) NOT NULL,
  `kode_mobil` varchar(5) NOT NULL,
  `jenis` varchar(30) NOT NULL,
  `merek` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `no_pelanggan` int(10) NOT NULL,
  `nama_pelanggan` varchar(30) NOT NULL,
  `alamat` varchar(225) NOT NULL,
  `telepon` int(12) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_penyewaan`
--

CREATE TABLE `riwayat_penyewaan` (
  `no_riwayat` int(10) NOT NULL,
  `id_transaksi` int(10) NOT NULL,
  `status_riwayat` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sewa`
--

CREATE TABLE `sewa` (
  `no_sewa` int(10) NOT NULL,
  `kode_sewa` varchar(5) NOT NULL,
  `id_pelanggan` int(10) NOT NULL,
  `id_mobil` int(10) NOT NULL,
  `tanggal_sewa` date NOT NULL,
  `lama_penyewan` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `no_staff` int(10) NOT NULL,
  `kode_staff` varchar(5) NOT NULL,
  `nama_staff` varchar(30) NOT NULL,
  `alamat_staff` varchar(30) NOT NULL,
  `telepon_staff` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `no_transaksi` int(10) NOT NULL,
  `kode_transaksi` varchar(5) NOT NULL,
  `id_sewa` int(10) NOT NULL,
  `biaya` int(12) NOT NULL,
  `status_transaksi` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mobil`
--
ALTER TABLE `mobil`
  ADD PRIMARY KEY (`no_mobil`),
  ADD KEY `no_mobil` (`no_mobil`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`no_pelanggan`),
  ADD KEY `no_pelanggan` (`no_pelanggan`);

--
-- Indexes for table `riwayat_penyewaan`
--
ALTER TABLE `riwayat_penyewaan`
  ADD PRIMARY KEY (`no_riwayat`),
  ADD KEY `no_riwayat` (`no_riwayat`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indexes for table `sewa`
--
ALTER TABLE `sewa`
  ADD PRIMARY KEY (`no_sewa`),
  ADD KEY `no_sewa` (`no_sewa`),
  ADD KEY `id_pelanggan` (`id_pelanggan`),
  ADD KEY `id_mobil` (`id_mobil`),
  ADD KEY `no_sewa_2` (`no_sewa`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`no_staff`),
  ADD KEY `no_staff` (`no_staff`),
  ADD KEY `no_staff_2` (`no_staff`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`no_transaksi`),
  ADD KEY `no_transaksi` (`no_transaksi`),
  ADD KEY `id_sewa` (`id_sewa`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `riwayat_penyewaan`
--
ALTER TABLE `riwayat_penyewaan`
  ADD CONSTRAINT `riwayat_penyewaan_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`no_transaksi`) ON UPDATE CASCADE;

--
-- Constraints for table `sewa`
--
ALTER TABLE `sewa`
  ADD CONSTRAINT `sewa_ibfk_1` FOREIGN KEY (`id_mobil`) REFERENCES `mobil` (`no_mobil`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sewa_ibfk_2` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`no_pelanggan`) ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_sewa`) REFERENCES `sewa` (`no_sewa`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
