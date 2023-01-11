-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2023 at 08:12 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eruditio_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses_tbl`
--

CREATE TABLE `courses_tbl` (
  `id` int(10) NOT NULL,
  `code` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `instructor` varchar(256) NOT NULL,
  `section` varchar(256) NOT NULL,
  `schedule` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses_tbl`
--

INSERT INTO `courses_tbl` (`id`, `code`, `name`, `instructor`, `section`, `schedule`) VALUES
(1, 'e9uU0X', 'Application Development', '002902001', '3CSA', '2:30 - 3:00 PM');

-- --------------------------------------------------------

--
-- Table structure for table `tasks_tbl`
--

CREATE TABLE `tasks_tbl` (
  `id` int(10) DEFAULT NULL,
  `task_code` varchar(256) NOT NULL,
  `course_id` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks_tbl`
--

INSERT INTO `tasks_tbl` (`id`, `task_code`, `course_id`) VALUES
(NULL, 'yJoQfQwLIh', 'e9uU0X');

-- --------------------------------------------------------

--
-- Table structure for table `users_tbl`
--

CREATE TABLE `users_tbl` (
  `id` int(10) NOT NULL,
  `school_id` varchar(30) NOT NULL,
  `course` varchar(256) NOT NULL,
  `yearlvl` varchar(10) NOT NULL,
  `block` varchar(5) NOT NULL,
  `firstname` varchar(256) NOT NULL,
  `lastname` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_tbl`
--

INSERT INTO `users_tbl` (`id`, `school_id`, `course`, `yearlvl`, `block`, `firstname`, `lastname`, `email`, `username`, `password`, `role`) VALUES
(1, '002902001', '', '', '', 'Jane', 'Doe', 'janedont@gmail.com', 'janedont', '$2b$10$uHycNPPY6S.4hp6KIu/TZul44sZH/ykqomxs3X6USR.tiRTQf896W', 1),
(2, '1234', 'BSCS', '3', 'A', 'Jason', 'Pael', 'jasonpael@gmail.com', 'jasonpael09', '$2b$10$d0fL6Yy2WAZmwGIMI4ZqWucPX9CSE5dqGouD1baRCipHXOwxp.5Qy', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses_tbl`
--
ALTER TABLE `courses_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_tbl`
--
ALTER TABLE `users_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses_tbl`
--
ALTER TABLE `courses_tbl`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_tbl`
--
ALTER TABLE `users_tbl`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
