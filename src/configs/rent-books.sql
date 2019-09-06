-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 05, 2019 at 09:50 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rent-books`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `date_released` date NOT NULL,
  `genre_id` int(11) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `image`, `date_released`, `genre_id`, `availability`, `created_at`, `updated_at`) VALUES
(1, 'KOMIK: JINGGA DAN SENJA', 'JINGGA DAN SENJA Tari dan Ari tidak sengaja bertemu saat upacara di sekolah. Ari tertarik pada Tari dan melakukan segala cara untuk mendekati si adik kelas. Ternyata nama mereka mirip, karena Tari dan Ari sama-sama lahir saat matahari terbenam. Tetapi, keduanya memiliki pribadi yang sangat bertolak belakang. Tari pemberani dan selalu ceria, tapi keras kepala. Sedangkan Ari cowok berandalan yang sering ikut tawuran. “Perang” pun sering terjadi di antara mereka, karena Tari menganggap Ari kasar dan sok penting. Situasi makin panas ketika Angga mulai mendekati Tari. Cowok itu dari SMA lain yang merupakan musuh bebuyutan sekolah mereka. Tetapi, tiba-tiba Angga berhenti mendekati Tari. Hubungan Tari dengan Ari juga makin renggang. Ada apakah?', 'https://cdn.gramedia.com/uploads/items/9786020618425_Komik-Jingga-__w414_hauto.jpg', '2018-10-08', 4, 1, '2019-09-03', '2019-09-03'),
(2, 'Detektif Conan 95', 'Conan berhasil kembali ke wujudnya semula, yaitu \"Shinichi Kudo\", selama batas waktu tertentu. Dengan demikian, ia pun bisa berangkat ke Kyoto bersama Ran dan teman-teman sekolahnya yang lain untuk acara karya wisata sekolah! Sayang. Tampaknya di sana telah menanti sebuah kasus pembunuhan berantai! Kemudian terungkaplah misteri terbesar dalam serial Detective Conan ini: Identitas Pemimpin Organisasi Baju Hitam!', 'https://cdn.gramedia.com/uploads/items/9786020497822_Cov_Conan_95__w414_hauto.jpg', '2019-04-22', 3, 1, '2019-09-03', '2019-09-03'),
(3, 'Book\'s', 'Book in to the World', 'http://res.cloudinary.com/imambaehaqi/image/upload/v1567561243/mt4yuuo4cpam6o1bvabc.png', '2019-08-17', 1, 1, '2019-09-04', '2019-09-04'),
(4, 'Nanti Kita Cerita Tentang Hari Ini', 'Nanti kita cerita tentang hari ini.\nBesok, kita bikin yang lebih bagus lagi.', 'http://res.cloudinary.com/imambaehaqi/image/upload/v1567561752/mr5rkklr55x2qqvlu0oe.jpg', '2018-10-25', 5, 1, '2019-09-04', '2019-09-04');

-- --------------------------------------------------------

--
-- Stand-in structure for view `books_list`
-- (See below for the actual view)
--
CREATE TABLE `books_list` (
`id` int(11)
,`title` varchar(100)
,`description` text
,`image` text
,`date_released` date
,`availability` tinyint(1)
,`genre` varchar(30)
);

-- --------------------------------------------------------

--
-- Table structure for table `borrowings`
--

CREATE TABLE `borrowings` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `borrowed_at` date NOT NULL,
  `returned_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `borrowings`
--

INSERT INTO `borrowings` (`id`, `book_id`, `user_id`, `borrowed_at`, `returned_at`) VALUES
(1, 1, 2, '2019-09-03', '2019-09-03'),
(2, 2, 1, '2019-09-03', '2019-09-03'),
(3, 2, 2, '2019-09-03', '2019-09-03');

-- --------------------------------------------------------

--
-- Stand-in structure for view `borrowings_list`
-- (See below for the actual view)
--
CREATE TABLE `borrowings_list` (
`id` int(11)
,`book_id` int(11)
,`title` varchar(100)
,`username` varchar(20)
,`borrowed_at` date
,`returned_at` date
);

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(1, 'Horror'),
(2, 'Advanture'),
(3, 'Mystery'),
(4, 'Romance'),
(5, 'Flash Fiction');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `level` enum('admin','regular') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `fullname`, `password`, `level`) VALUES
(1, 'admin@gmail.com', 'admin', '', 'e5d9a8cad94803d2da5e570b0c7d7ba7313a675d4c889846910380670940703a', 'admin'),
(2, 'imamdummy@gmail.com', 'dummydummy', 'dummy baehaqi', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'admin'),
(3, 'dommylou@gmail.com', 'dumydummy', 'dummy Lou', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'regular'),
(4, 'dummycrash@gmail.com', 'dummytwo', 'Dummy Crashed', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'regular');

-- --------------------------------------------------------

--
-- Structure for view `books_list`
--
DROP TABLE IF EXISTS `books_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `books_list`  AS  select `books`.`id` AS `id`,`books`.`title` AS `title`,`books`.`description` AS `description`,`books`.`image` AS `image`,`books`.`date_released` AS `date_released`,`books`.`availability` AS `availability`,`genres`.`name` AS `genre` from (`books` join `genres` on((`books`.`genre_id` = `genres`.`id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `borrowings_list`
--
DROP TABLE IF EXISTS `borrowings_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `borrowings_list`  AS  select `borrowings`.`id` AS `id`,`borrowings`.`book_id` AS `book_id`,`books`.`title` AS `title`,`users`.`username` AS `username`,`borrowings`.`borrowed_at` AS `borrowed_at`,`borrowings`.`returned_at` AS `returned_at` from ((`borrowings` join `users` on((`borrowings`.`user_id` = `users`.`id`))) join `books` on((`borrowings`.`book_id` = `books`.`id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `borrowings`
--
ALTER TABLE `borrowings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);

--
-- Constraints for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD CONSTRAINT `borrowings_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `borrowings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
