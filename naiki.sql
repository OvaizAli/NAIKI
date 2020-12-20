CREATE DATABASE  IF NOT EXISTS `naiki` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `naiki`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: naiki
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `alldonations`
--

DROP TABLE IF EXISTS `alldonations`;
/*!50001 DROP VIEW IF EXISTS `alldonations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `alldonations` AS SELECT 
 1 AS `donat_id`,
 1 AS `name`,
 1 AS `type_name`,
 1 AS `quantity`,
 1 AS `contact`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `allrequests`
--

DROP TABLE IF EXISTS `allrequests`;
/*!50001 DROP VIEW IF EXISTS `allrequests`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `allrequests` AS SELECT 
 1 AS `don_id`,
 1 AS `name`,
 1 AS `type_name`,
 1 AS `quantity`,
 1 AS `contact`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `don_details`
--

DROP TABLE IF EXISTS `don_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `don_details` (
  `match_id` int NOT NULL AUTO_INCREMENT,
  `don_id` int NOT NULL,
  `donor_id` int NOT NULL,
  `donat_amount` int NOT NULL,
  `rem_amount` int NOT NULL,
  PRIMARY KEY (`match_id`),
  KEY `d_id_idx` (`donor_id`),
  KEY `don_id` (`don_id`),
  CONSTRAINT `d_id` FOREIGN KEY (`donor_id`) REFERENCES `donor` (`idDonor`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `don_id` FOREIGN KEY (`don_id`) REFERENCES `donation_req` (`don_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_details`
--

LOCK TABLES `don_details` WRITE;
/*!40000 ALTER TABLE `don_details` DISABLE KEYS */;
INSERT INTO `don_details` VALUES (1,4,1,5000,45000),(2,2,3,10,0);
/*!40000 ALTER TABLE `don_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `commit_trans` AFTER INSERT ON `don_details` FOR EACH ROW BEGIN
    insert into trans_history(trans_date) value(CURDATE());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `donat_type`
--

DROP TABLE IF EXISTS `donat_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donat_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(40) NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_name_UNIQUE` (`type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donat_type`
--

LOCK TABLES `donat_type` WRITE;
/*!40000 ALTER TABLE `donat_type` DISABLE KEYS */;
INSERT INTO `donat_type` VALUES (5,'clothes (female)'),(6,'clothes (kids)'),(4,'clothes (male)'),(8,'medical (aid)'),(9,'medical (blood)'),(7,'medical (organ)'),(1,'money'),(10,'money (education)'),(11,'money (medical)'),(2,'ration'),(3,'volunteers');
/*!40000 ALTER TABLE `donat_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `donat_id` int NOT NULL AUTO_INCREMENT,
  `donor_id` int DEFAULT NULL,
  `type_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `loc_id` int DEFAULT NULL,
  PRIMARY KEY (`donat_id`),
  KEY `t_id_idx` (`type_id`),
  KEY `donor_id` (`donor_id`),
  KEY `loc_id` (`loc_id`),
  CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `donor` (`idDonor`),
  CONSTRAINT `donation_ibfk_2` FOREIGN KEY (`loc_id`) REFERENCES `location` (`idLoc`),
  CONSTRAINT `type_id` FOREIGN KEY (`type_id`) REFERENCES `donat_type` (`type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (1,1,1,0,1),(2,3,2,0,4),(3,1,1,3000,1);
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_req`
--

DROP TABLE IF EXISTS `donation_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_req` (
  `don_id` int NOT NULL AUTO_INCREMENT,
  `seeker_id` int DEFAULT NULL,
  `type_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `loc_id` int DEFAULT NULL,
  PRIMARY KEY (`don_id`),
  KEY `t_id_idx` (`type_id`),
  KEY `seeker_id` (`seeker_id`),
  KEY `loc_id` (`loc_id`),
  CONSTRAINT `donation_req_ibfk_1` FOREIGN KEY (`seeker_id`) REFERENCES `seeker` (`idSeeker`),
  CONSTRAINT `donation_req_ibfk_2` FOREIGN KEY (`loc_id`) REFERENCES `location` (`idLoc`),
  CONSTRAINT `donation_req_ibfk_3` FOREIGN KEY (`loc_id`) REFERENCES `location` (`idLoc`),
  CONSTRAINT `t_id` FOREIGN KEY (`type_id`) REFERENCES `donat_type` (`type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_req`
--

LOCK TABLES `donation_req` WRITE;
/*!40000 ALTER TABLE `donation_req` DISABLE KEYS */;
INSERT INTO `donation_req` VALUES (1,1,1,10000,1),(2,4,2,0,1),(3,4,4,2,2),(4,5,1,45000,4);
/*!40000 ALTER TABLE `donation_req` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donor`
--

DROP TABLE IF EXISTS `donor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donor` (
  `idDonor` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`idDonor`),
  UNIQUE KEY `idx_donor_idDonor` (`idDonor`),
  UNIQUE KEY `idx_donor_user_id` (`user_id`),
  KEY `u_id_idx` (`user_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `uid` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor`
--

LOCK TABLES `donor` WRITE;
/*!40000 ALTER TABLE `donor` DISABLE KEYS */;
INSERT INTO `donor` VALUES (1,3),(2,4),(3,5),(4,6),(5,7),(9,8),(10,10),(11,12),(12,13),(13,14),(14,15);
/*!40000 ALTER TABLE `donor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `idLoc` int NOT NULL AUTO_INCREMENT,
  `LocName` varchar(45) NOT NULL,
  PRIMARY KEY (`idLoc`),
  UNIQUE KEY `LocName_UNIQUE` (`LocName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (4,'Islamabad'),(1,'Karachi'),(2,'Lahore'),(6,'Peshawar'),(5,'Quetta');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ngo`
--

DROP TABLE IF EXISTS `ngo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ngo` (
  `idNGO` int NOT NULL AUTO_INCREMENT,
  `NGOName` varchar(45) NOT NULL,
  `Loc_id` int NOT NULL,
  PRIMARY KEY (`idNGO`),
  KEY `loc_id_idx` (`Loc_id`),
  CONSTRAINT `locid` FOREIGN KEY (`Loc_id`) REFERENCES `location` (`idLoc`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ngo`
--

LOCK TABLES `ngo` WRITE;
/*!40000 ALTER TABLE `ngo` DISABLE KEYS */;
INSERT INTO `ngo` VALUES (1,'Edhi',1),(2,'Edhi',2),(3,'Edhi',4),(4,'Edhi',5),(5,'Edhi',6);
/*!40000 ALTER TABLE `ngo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ngo_emp`
--

DROP TABLE IF EXISTS `ngo_emp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ngo_emp` (
  `idNGO_Emp` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `NGO_id` int NOT NULL,
  PRIMARY KEY (`idNGO_Emp`),
  KEY `ngo_id_idx` (`NGO_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `ngo_id` FOREIGN KEY (`NGO_id`) REFERENCES `ngo` (`idNGO`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ngo_emp`
--

LOCK TABLES `ngo_emp` WRITE;
/*!40000 ALTER TABLE `ngo_emp` DISABLE KEYS */;
INSERT INTO `ngo_emp` VALUES (1,5,3),(2,3,1),(3,4,2),(4,7,5),(5,8,4),(6,9,1);
/*!40000 ALTER TABLE `ngo_emp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seeker`
--

DROP TABLE IF EXISTS `seeker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seeker` (
  `idSeeker` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`idSeeker`),
  UNIQUE KEY `idx_seeker_user_id` (`user_id`),
  KEY `u_id_idx` (`user_id`),
  CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seeker`
--

LOCK TABLES `seeker` WRITE;
/*!40000 ALTER TABLE `seeker` DISABLE KEYS */;
INSERT INTO `seeker` VALUES (1,3),(4,4),(5,5),(6,6),(8,8),(9,10),(10,12),(11,13),(12,14),(13,15);
/*!40000 ALTER TABLE `seeker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `cnic` bigint NOT NULL,
  `name` varchar(45) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `contact` bigint NOT NULL,
  `email` varchar(60) NOT NULL,
  `loc_id` int NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `cnic_UNIQUE` (`cnic`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `loc_id_idx` (`loc_id`),
  CONSTRAINT `loc_id` FOREIGN KEY (`loc_id`) REFERENCES `location` (`idLoc`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (3,4220106749441,'Zaeem Ahmed','M',3311355294,'ahmedzaeem32@gmail.com',1,'test123'),(4,4220103456785,'Ovaiz Ali','M',3234532567,'ovaizali@gmail.com',2,'12345'),(5,4220106749444,'Sarah','F',3321456842,'sarahfatima99@gmail.com',4,'123456'),(6,4220106545449,'Hassan','M',3065487201,'hassan.khan@gmail.com',1,'hello123'),(7,4220106545045,'Ashad','M',3065487212,'ashad23@gmail.com',6,'testing123'),(8,4220106442045,'Awatif','M',3312354410,'awatifansari@gmail.com',5,'hello123'),(9,4220106749449,'Laiba','F',3112354413,'laibaimran123@gmail.com',1,'test123'),(10,4250169874532,'Danish','M',3215478964,'danishkhan123@gmail.com',5,'123000'),(12,4250135687456,'Hammad','M',3007005575,'hammad123@gmail.com',6,'testing123'),(13,4220156410245,'Shizza Syed','F',3007005542,'ShizzaSyed235@gmail.com',2,'123456'),(14,4220156412354,'Mustaali','M',3007004020,'mustaalihussain@gmail.com',5,'654321'),(15,4220329874563,'Farah','F',3214568745,'farahkhan23@gmail.com',4,'testing123');
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_history`
--

DROP TABLE IF EXISTS `trans_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_history` (
  `trans_id` int NOT NULL AUTO_INCREMENT,
  `trans_date` date NOT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_history`
--

LOCK TABLES `trans_history` WRITE;
/*!40000 ALTER TABLE `trans_history` DISABLE KEYS */;
INSERT INTO `trans_history` VALUES (1,'2020-12-16'),(2,'2020-12-16');
/*!40000 ALTER TABLE `trans_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'naiki'
--

--
-- Dumping routines for database 'naiki'
--
/*!50003 DROP PROCEDURE IF EXISTS `commit_trans` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `commit_trans`()
BEGIN
	commit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `login`()
BEGIN
 select cnic, password from sys_user;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_donor_seeker` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_donor_seeker`(IN uid int)
BEGIN
	insert into seeker(user_id) value(uid);
    insert into donor(user_id) value(uid);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `user_donation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_donation`(IN dcnic BIGINT)
BEGIN
select don.donat_id, u.name, t.type_name, don.quantity, u.contact 
from donation don join sys_user u join donat_type t join donor d 
where d.idDonor = don.donor_id and t.type_id = don.type_id and d.user_id = u.user_id and u.cnic = dcnic; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `user_request` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_request`(IN scnic BIGINT)
BEGIN
select req.don_id, u.name, t.type_name, req.quantity, u.contact 
from donation_req req join sys_user u join donat_type t join seeker s 
where s.idSeeker = req.seeker_id and t.type_id = req.type_id and s.user_id = u.user_id and u.cnic = scnic;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `alldonations`
--

/*!50001 DROP VIEW IF EXISTS `alldonations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `alldonations` AS select `don`.`donat_id` AS `donat_id`,`u`.`name` AS `name`,`t`.`type_name` AS `type_name`,`don`.`quantity` AS `quantity`,`u`.`contact` AS `contact` from (((`donation` `don` join `sys_user` `u`) join `donat_type` `t`) join `donor` `d`) where ((`d`.`idDonor` = `don`.`donor_id`) and (`t`.`type_id` = `don`.`type_id`) and (`d`.`user_id` = `u`.`user_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `allrequests`
--

/*!50001 DROP VIEW IF EXISTS `allrequests`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `allrequests` AS select `req`.`don_id` AS `don_id`,`u`.`name` AS `name`,`t`.`type_name` AS `type_name`,`req`.`quantity` AS `quantity`,`u`.`contact` AS `contact` from (((`donation_req` `req` join `sys_user` `u`) join `donat_type` `t`) join `seeker` `s`) where ((`s`.`idSeeker` = `req`.`seeker_id`) and (`t`.`type_id` = `req`.`type_id`) and (`s`.`user_id` = `u`.`user_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-20 14:23:11
