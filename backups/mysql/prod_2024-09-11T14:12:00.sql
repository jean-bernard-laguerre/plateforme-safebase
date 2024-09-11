-- MySQL dump 10.13  Distrib 9.0.1, for Linux (aarch64)
--
-- Host: localhost    Database: prod
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avis`
--

DROP TABLE IF EXISTS `avis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `review` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RestaurantId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RestaurantId` (`RestaurantId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `avis_ibfk_5` FOREIGN KEY (`RestaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `avis_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avis`
--

LOCK TABLES `avis` WRITE;
/*!40000 ALTER TABLE `avis` DISABLE KEYS */;
INSERT INTO `avis` VALUES (2,3,'Doloremque nesciunt maxime asperiores molestias eius. Ratione voluptates totam hic debitis at quisquam amet quia voluptatem. Et qui totam ut non saepe debitis. Totam ex labore eius. Natus reprehenderit aut omnis aut natus illum nesciunt. Corporis iste odio quisquam odit impedit dolor.','2024-04-22 11:45:04','2024-04-24 11:54:02',3,1),(3,4,'implement innovative e-services','2024-04-22 11:51:59','2024-04-22 11:51:59',3,1),(4,4,'facilitate interactive models','2024-04-22 12:24:54','2024-04-22 12:24:54',1,1),(5,4,'integrate killer schemas','2024-04-22 12:25:03','2024-04-22 12:25:03',1,1),(6,4,'integrate user-centric solutions','2024-04-22 12:31:25','2024-04-22 12:31:25',2,1),(7,4,'Commentaire edité','2024-05-16 08:09:46','2024-05-16 14:25:28',6,12),(8,3,'test commentaire','2024-05-16 08:16:07','2024-06-03 07:55:52',1,12),(9,5,'Excellent','2024-06-02 21:57:39','2024-06-02 21:57:39',7,12);
/*!40000 ALTER TABLE `avis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `time` time NOT NULL,
  `people` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  `RestaurantId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `RestaurantId` (`RestaurantId`),
  CONSTRAINT `reservations_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservations_ibfk_6` FOREIGN KEY (`RestaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:23','2024-04-05 14:09:23',1,3),(2,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:26','2024-04-05 14:09:26',1,3),(3,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:27','2024-04-05 14:09:27',1,3),(4,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:28','2024-04-05 14:09:28',1,3),(5,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:29','2024-04-05 14:09:29',1,3),(7,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:30','2024-04-05 14:09:30',1,3),(8,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:31','2024-04-05 14:09:31',1,3),(9,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:32','2024-04-05 14:09:32',1,3),(10,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:32','2024-04-05 14:09:32',1,3),(11,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:33','2024-04-05 14:09:33',1,3),(12,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:34','2024-04-05 14:09:34',1,3),(13,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:37','2024-04-05 14:09:37',1,3),(14,'2024-06-03 22:00:00','20:00:00',4,'2024-04-05 14:09:38','2024-04-05 14:09:38',1,3),(15,'2024-06-03 22:00:00','20:00:00',4,'2024-04-22 08:25:12','2024-04-22 08:25:12',1,3),(16,'2024-06-03 22:00:00','21:00:00',4,'2024-05-15 11:21:27','2024-05-15 11:21:27',1,6),(17,'2024-06-04 22:00:00','21:00:00',4,'2024-05-15 11:25:51','2024-05-15 11:25:51',1,6),(18,'2024-05-24 00:00:00','13:00:00',1,'2024-05-15 14:24:05','2024-05-16 13:21:06',12,2),(20,'2024-06-01 00:00:00','13:00:00',4,'2024-05-15 14:44:08','2024-05-15 14:44:08',12,6),(21,'2024-05-19 00:00:00','21:00:00',6,'2024-05-16 07:38:08','2024-05-16 07:38:08',12,1),(25,'2024-06-15 00:00:00','20:00:00',3,'2024-06-02 10:49:12','2024-06-02 10:49:12',12,6),(26,'2024-06-14 00:00:00','21:00:00',6,'2024-06-06 07:23:36','2024-06-06 07:23:36',12,1);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsables`
--

DROP TABLE IF EXISTS `responsables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` enum('responsable','patron') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  `RestaurantId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `RestaurantId` (`RestaurantId`),
  CONSTRAINT `responsables_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `responsables_ibfk_6` FOREIGN KEY (`RestaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsables`
--

LOCK TABLES `responsables` WRITE;
/*!40000 ALTER TABLE `responsables` DISABLE KEYS */;
INSERT INTO `responsables` VALUES (1,'patron','2024-04-05 10:10:08','2024-04-05 10:10:08',1,1),(2,'responsable','2024-04-05 11:28:16','2024-04-05 11:28:16',3,1),(3,'patron','2024-04-05 11:33:55','2024-04-05 11:33:55',1,2),(4,'patron','2024-04-05 11:35:13','2024-04-05 11:35:13',1,3),(5,'patron','2024-04-06 09:57:14','2024-04-06 09:57:14',1,4),(6,'patron','2024-04-22 10:02:04','2024-04-22 10:02:04',1,5),(7,'patron','2024-05-13 13:03:38','2024-05-13 13:03:38',12,6),(8,'patron','2024-05-29 20:35:54','2024-05-29 20:35:54',12,7),(9,'patron','2024-06-01 20:53:21','2024-06-01 20:53:21',12,8),(11,'patron','2024-06-01 20:54:15','2024-06-01 20:54:15',12,10),(12,'patron','2024-06-01 20:54:36','2024-06-01 20:54:36',12,11);
/*!40000 ALTER TABLE `responsables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `capacity` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Esperanza','reintermediate world-class infomediaries','568 Rachelle Roads','Willard45@hotmail.com',345,'2024-04-05 10:10:08','2024-04-05 10:37:02','francais'),(2,'Amber','strategize sexy e-commerce','5097 Altenwerth Drive','Armani81@hotmail.com',505,'2024-04-05 11:33:55','2024-04-05 13:37:23','chinois'),(3,'Cordie','leverage sticky blockchains','82275 Isabelle Islands','Furman.Kilback@hotmail.com',45,'2024-04-05 11:35:13','2024-04-06 09:57:19','japonais'),(4,'Foster','benchmark e-business web-readiness','86696 Elna Locks','Bernadine_Gerlach98@gmail.com',837,'2024-04-06 09:57:14','2024-04-06 09:57:14','vegetarien'),(5,'Darius','incubate B2B content','72754 Hyman Pass','Lue75@gmail.com',923,'2024-04-22 10:02:04','2024-04-22 10:02:04','vegan'),(6,'Kim Buck','Enim atque ut tempor','512, Sequi beatae nesciun','qacisuq@mailinator.com',66,'2024-05-13 13:03:38','2024-06-02 21:54:39','italien'),(7,'The new new','Test creation categorie','123sd, dsqfklm dflkqs ldkskqjmflkqjs ','nalixot363@avastu.com',17,'2024-05-29 20:35:54','2024-05-29 20:35:54','fast-food'),(8,'El Miranda','Velit voluptatem u','135, Distinctio Voluptas','zywu@mailinator.com',6,'2024-06-01 20:53:21','2024-06-01 20:53:21','mexicain'),(10,'Violet Mays','Necessitatibus nesci','Unde exercitation do','mojef@mailinator.com',3,'2024-06-01 20:54:15','2024-06-01 20:54:15','halal'),(11,'Camacho','Quia dolore qui dolo','789, In excepteur odio ip','dynujy@mailinator.com',58,'2024-06-01 20:54:36','2024-06-02 08:27:01','sans-gluten');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jake','Dwight.Sauer74@hotmail.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','admin','2024-04-05 09:44:56','2024-04-05 10:10:08'),(2,'Myriam','Jeremie.Lockman@yahoo.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-05 11:27:41','2024-04-24 12:15:31'),(3,'Keeley','Joanie_Walter95@gmail.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','admin','2024-04-05 11:27:42','2024-04-05 11:28:16'),(4,'Roxane','Laura_Williamson@yahoo.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-05 11:27:43','2024-04-05 11:27:43'),(5,'Garret','Jordy.Rowe18@gmail.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-05 11:27:43','2024-04-05 11:27:43'),(6,'Kattie','Abigayle.Marvin@yahoo.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-05 11:27:44','2024-04-05 11:27:44'),(7,'Jose','Torrance.Ziemann17@gmail.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-05 11:27:45','2024-04-05 11:27:45'),(8,'Makenna','Maximillia_Runolfsdottir@yahoo.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-05 11:27:46','2024-04-05 11:27:46'),(9,'Nadia','Lea93@gmail.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-05 11:27:47','2024-04-05 11:27:47'),(10,'Rosemarie','Paul72@gmail.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-06 09:56:43','2024-04-06 09:56:43'),(11,'testUser','test@test.fr','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','user','2024-04-23 11:32:07','2024-04-23 11:32:07'),(12,'Test','test2@test.fr','937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244','admin','2024-05-13 09:57:01','2024-08-30 11:42:18'),(13,'JBL','test@mail.com','937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244','user','2024-05-13 12:10:10','2024-05-13 12:10:10'),(45,'test','test2@test.tst','cba43433d4708daab84bf697d4f6a6ff772a2e90dc96f6abaa57daa4fa4a4071','user','2024-08-28 12:00:04','2024-08-28 12:00:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-11 12:12:00
