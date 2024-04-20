-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2024 a las 08:53:51
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `almacenamiento`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apikeys`
--

CREATE TABLE `apikeys` (
  `IdApiKey` int(11) NOT NULL,
  `ApiKey` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `IdCliente` int(11) NOT NULL,
  `Nombre` varchar(150) NOT NULL,
  `Ciudad` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductores`
--

CREATE TABLE `conductores` (
  `IdConductor` int(11) NOT NULL,
  `Nombre` varchar(150) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `GrupoSanguineo` varchar(3) NOT NULL,
  `IdEmpresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `IdEmpresa` int(11) NOT NULL,
  `Nombre` varchar(150) NOT NULL,
  `Ciudad` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familiares`
--

CREATE TABLE `familiares` (
  `IdFamiliar` int(11) NOT NULL,
  `Nombre` varchar(150) NOT NULL,
  `IdConductor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `usuariocompleto`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `usuariocompleto` (
`IdUsuario` int(11)
,`Password` varchar(18)
,`Correo` varchar(150)
,`tipo` varchar(16)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `IdUsuario` int(11) NOT NULL,
  `Password` varchar(18) NOT NULL,
  `Correo` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `IdVehiculo` int(11) NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `FechaAdquisicion` date NOT NULL,
  `IdEmpresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `IdViaje` int(11) NOT NULL,
  `IdCliente` int(11) NOT NULL,
  `IdEmpresa` int(11) NOT NULL,
  `IdConductor` int(11) NOT NULL,
  `IdVehiculo` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `TipoCarga` varchar(70) NOT NULL,
  `Peso` double NOT NULL,
  `NoRemolques` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura para la vista `usuariocompleto`
--
DROP TABLE IF EXISTS `usuariocompleto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usuariocompleto`  AS SELECT `u`.`IdUsuario` AS `IdUsuario`, `u`.`Password` AS `Password`, `u`.`Correo` AS `Correo`, CASE WHEN `c`.`IdConductor` is not null THEN 'Conductor' WHEN `e`.`IdEmpresa` is not null THEN 'Empresa' WHEN `f`.`IdFamiliar` is not null THEN 'Familiar' ELSE 'Tipo Desconocido' END AS `tipo` FROM (((`usuarios` `u` left join `conductores` `c` on(`u`.`IdUsuario` = `c`.`IdConductor`)) left join `empresas` `e` on(`u`.`IdUsuario` = `e`.`IdEmpresa`)) left join `familiares` `f` on(`u`.`IdUsuario` = `f`.`IdFamiliar`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `apikeys`
--
ALTER TABLE `apikeys`
  ADD PRIMARY KEY (`IdApiKey`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`IdCliente`);

--
-- Indices de la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD PRIMARY KEY (`IdConductor`),
  ADD KEY `IdEmpresa` (`IdEmpresa`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`IdEmpresa`);

--
-- Indices de la tabla `familiares`
--
ALTER TABLE `familiares`
  ADD PRIMARY KEY (`IdFamiliar`),
  ADD KEY `IdConductor` (`IdConductor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`IdUsuario`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`IdVehiculo`),
  ADD KEY `IdEmpresa` (`IdEmpresa`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`IdViaje`),
  ADD KEY `IdEmpresa` (`IdEmpresa`),
  ADD KEY `IdCliente` (`IdCliente`),
  ADD KEY `IdConductor` (`IdConductor`),
  ADD KEY `IdVehiculo` (`IdVehiculo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `apikeys`
--
ALTER TABLE `apikeys`
  MODIFY `IdApiKey` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `IdVehiculo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `IdViaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD CONSTRAINT `conductores_ibfk_1` FOREIGN KEY (`IdEmpresa`) REFERENCES `empresas` (`IdEmpresa`),
  ADD CONSTRAINT `conductores_ibfk_2` FOREIGN KEY (`IdConductor`) REFERENCES `usuarios` (`IdUsuario`);

--
-- Filtros para la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`IdEmpresa`) REFERENCES `usuarios` (`IdUsuario`);

--
-- Filtros para la tabla `familiares`
--
ALTER TABLE `familiares`
  ADD CONSTRAINT `familiares_ibfk_1` FOREIGN KEY (`IdConductor`) REFERENCES `conductores` (`IdConductor`),
  ADD CONSTRAINT `familiares_ibfk_2` FOREIGN KEY (`IdFamiliar`) REFERENCES `usuarios` (`IdUsuario`);

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`IdEmpresa`) REFERENCES `empresas` (`IdEmpresa`);

--
-- Filtros para la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `viajes_ibfk_1` FOREIGN KEY (`IdEmpresa`) REFERENCES `empresas` (`IdEmpresa`),
  ADD CONSTRAINT `viajes_ibfk_2` FOREIGN KEY (`IdCliente`) REFERENCES `clientes` (`IdCliente`),
  ADD CONSTRAINT `viajes_ibfk_3` FOREIGN KEY (`IdConductor`) REFERENCES `conductores` (`IdConductor`),
  ADD CONSTRAINT `viajes_ibfk_4` FOREIGN KEY (`IdVehiculo`) REFERENCES `vehiculos` (`IdVehiculo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
