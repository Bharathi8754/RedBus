-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: red_bus
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `tbl_buses`
--

DROP TABLE IF EXISTS `tbl_buses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_buses` (
  `bus_id` int NOT NULL AUTO_INCREMENT,
  `bus_name` varchar(255) DEFAULT NULL,
  `bus_number` varchar(255) DEFAULT NULL,
  `available_seats` int NOT NULL,
  `source_station` varchar(255) DEFAULT NULL,
  `destination_station` varchar(255) DEFAULT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `ticket_price` double NOT NULL,
  `route_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_buses`
--

LOCK TABLES `tbl_buses` WRITE;
/*!40000 ALTER TABLE `tbl_buses` DISABLE KEYS */;
INSERT INTO `tbl_buses` VALUES (4,'Orange Travels','bus004',48,'bangalore','karaikudi','2025-05-08 14:30:00','2025-05-08 17:30:00',6000,0,'2025-05-09 05:43:02','2025-05-26 12:46:09'),(5,'Gujarat Travels','bus006',40,'chennai','gujarat','2025-05-08 12:30:00','2025-05-09 10:30:00',8000,0,'2025-05-09 06:52:48','2025-05-09 06:52:48'),(6,'State Transport','bus007',35,'Madurai','chennai','2025-05-08 12:30:00','2025-05-09 10:30:00',3000,0,'2025-05-09 07:09:33','2025-05-09 09:23:46'),(7,'State Transport','bus008',32,'Kallakurichi','chennai','2025-05-08 12:30:00','2025-05-09 10:30:00',3000,0,'2025-05-09 07:16:18','2025-06-02 10:13:26'),(8,'Kallada Tours & Travels','bus008',54,'Kallakurichi','chennai','2025-05-08 12:30:00','2025-05-09 10:30:00',4000,0,'2025-05-09 07:17:19','2025-05-26 11:18:58');
/*!40000 ALTER TABLE `tbl_buses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tbl`
--

DROP TABLE IF EXISTS `user_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tbl` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `bus_id` bigint DEFAULT NULL,
  `created_time` datetime(6) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `no_seats` int NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `updated_time` datetime(6) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tbl`
--

LOCK TABLES `user_tbl` WRITE;
/*!40000 ALTER TABLE `user_tbl` DISABLE KEYS */;
INSERT INTO `user_tbl` VALUES (1,30,4,'2025-05-26 10:00:00.000000','john.doe@example.com','Male',2,'9876543210','2025-05-26 10:00:00.000000','John Doe'),(2,22,8,NULL,'bharathivasan@gmail.com','Male',2,'8754813814',NULL,'Bharathivasan'),(3,20,8,NULL,'bharathivasan@gmail.com','Female',1,'8754813814',NULL,'nila'),(4,22,8,'2025-05-26 13:45:47.325507','bharathivasan08@gmail.com','Male',2,'8754813814','2025-05-26 13:45:47.325507','Bharathivasan.R'),(5,18,8,'2025-05-26 16:24:03.642663','pavithra@gmail.com','Female',1,'8754813814','2025-05-26 16:24:03.642663','pavithra'),(6,13,8,'2025-05-26 16:45:37.639874','demo@gamil.com','Male',1,'8754813814','2025-05-26 16:45:37.639874','demo1'),(7,23,8,'2025-05-26 16:46:41.113926','demo@gamil.com','Male',1,'8754813814','2025-05-26 16:46:41.113926','demo2'),(8,23,8,'2025-05-26 16:48:06.387938','demo@gamil.com','Male',1,'8754813814','2025-05-26 16:48:06.387938','demo3'),(9,23,8,'2025-05-26 16:48:58.139637','demo@gamil.com','Female',0,'8754813814','2025-05-26 16:48:58.139637','demo4'),(10,20,4,'2025-05-26 18:16:09.218523','demo@gamil.com','Female',2,'8754813814','2025-05-26 18:16:09.218523','nila'),(11,20,7,'2025-06-02 15:43:26.102553','demo@gamil.com','Female',3,'8754813814','2025-06-02 15:43:26.102553','nila');
/*!40000 ALTER TABLE `user_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-02 16:28:30
