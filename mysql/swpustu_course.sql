CREATE TABLE `command` (
  `deviceId` int(11) NOT NULL,
  `cmd` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='命令控制';

CREATE TABLE `history` (
  `deviceId` int(11) NOT NULL,
  `createTime` varchar(45) NOT NULL,
  `solidStatus` int(11) DEFAULT NULL,
  `rainStatus` int(11) DEFAULT NULL,
  `humidity` varchar(45) DEFAULT NULL,
  `temperature` varchar(45) DEFAULT NULL,
  `light` int(11) DEFAULT NULL,
  PRIMARY KEY (`createTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='历史表';

CREATE TABLE `sensor_list` (
  `deviceId` int(11) NOT NULL,
  `deviceName` varchar(45) DEFAULT NULL,
  `solidStatus` int(11) DEFAULT NULL,
  `rainStatus` int(11) DEFAULT NULL,
  `humidity` varchar(45) DEFAULT NULL,
  `temperature` varchar(45) DEFAULT NULL,
  `light` int(11) DEFAULT NULL,
  PRIMARY KEY (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='最新数据表';

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_own_device` (
  `userId` int(11) NOT NULL,
  `deviceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
