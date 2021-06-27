-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 27 Cze 2021, 13:07
-- Wersja serwera: 10.4.18-MariaDB
-- Wersja PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `id16963265_denti`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `t_event`
--

CREATE TABLE `t_event` (
  `id` varchar(255) NOT NULL,
  `id_dent` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `event` varchar(255) NOT NULL,
  `data_start` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_end` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `t_event`
--

INSERT INTO `t_event` (`id`, `id_dent`, `id_user`, `event`, `data_start`, `data_end`) VALUES
('1dafa00e-9042-48bf-8462-d568cb46ce0b', 1, 3, '', '2020-07-05 12:00:00', '2020-07-05 12:00:00'),
('a7bc4d55-2126-40f0-9781-8ca6fc161b5a', 1, 3, '', '2020-07-05 12:00:00', '2020-07-05 12:00:00'),
('cdfd2df5-d695-41f3-aaa0-259aadfb3bdf', 1, 3, '', '2020-07-05 12:00:00', '2020-07-05 12:00:00'),
('651c47c4-62f8-434e-b14e-ad6f21dfc206', 2, 3, '', '2020-07-05 12:00:00', '2020-07-05 12:00:00'),
('87be67d9-a5be-498f-933e-fec9132eab29', 2, 3, '', '2020-07-05 13:00:00', '2020-07-05 13:00:00'),
('d3d6fa8e-cd8e-4368-8e78-02d0d301d70d', 2, 3, '', '2020-07-05 14:00:00', '2020-07-05 14:00:00'),
('2df69bea-1021-4874-80f9-156bd53c2cf1', 2, 3, '', '2021-07-01 10:30:00', '2021-07-01 10:30:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `t_permissions`
--

CREATE TABLE `t_permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `add_user` tinyint(4) NOT NULL,
  `rm_user` tinyint(4) NOT NULL,
  `add_event` tinyint(4) NOT NULL,
  `rm_event` tinyint(4) NOT NULL,
  `edit_user` tinyint(4) NOT NULL,
  `edit_event` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `t_permissions`
--

INSERT INTO `t_permissions` (`id`, `name`, `add_user`, `rm_user`, `add_event`, `rm_event`, `edit_user`, `edit_event`) VALUES
(1, 'Admin', 1, 1, 1, 1, 1, 1),
(2, 'Lekarz', 0, 0, 0, 0, 0, 0),
(3, 'Pacjent', 0, 0, 1, 1, 0, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `t_users`
--

CREATE TABLE `t_users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `pesel` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_permissions` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `t_users`
--

INSERT INTO `t_users` (`id`, `name`, `surname`, `pesel`, `email`, `phone`, `password`, `id_permissions`) VALUES
('1', 'Admin', 'Admin', '98989898989', 'admin@admin.pl', '', '$2y$10$7bDqw1CRmRA5TpY2CP78SOe.wYAY0hcEhEV3NxltqvHQpj5YkWzAK', 1),
('2', 'dentist', 'dentist', '98989898982', 'denti@denti.pl', '', '$2y$10$xkC51mIpDoRJLUnuIgK6Aetnwrjy3idss4Dl1K1Ak3kqxCjcq0L3i', 2),
('3', 'dentist2', 'dentist2', '98989898982', 'denti2@denti.pl', '', '$2y$10$xkC51mIpDoRJLUnuIgK6Aetnwrjy3idss4Dl1K1Ak3kqxCjcq0L3i', 2),
('4', 'user', 'user', '98989898981', 'user@gmail.com', '', '$2y$10$Yhdnm/YMAxoB0GeBOJV.YunHumTfm9JJ7wmeXFh3dSZogiLX/PVmS', 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
