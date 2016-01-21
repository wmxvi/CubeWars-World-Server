CREATE TABLE `attributes` (
  `playerId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `health` int(11) NOT NULL DEFAULT '100',
  `maxHealth` int(11) NOT NULL DEFAULT '100',
  `energy` int(11) NOT NULL DEFAULT '100',
  `armour` int(11) NOT NULL DEFAULT '100',
  `attack` int(11) NOT NULL DEFAULT '100',
  PRIMARY KEY (`playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `players` (
  `playerId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL DEFAULT '',
  `registrationTimestamp` varchar(255) NOT NULL,
  `positionX` int(10) NOT NULL,
  `positionY` int(10) NOT NULL,
  `positionZ` int(10) NOT NULL,
  `rotationX` float(15,14) NOT NULL,
  `rotationY` float(15,14) NOT NULL,
  `rotationZ` float(15,14) NOT NULL,
  `rotationW` float(15,14) NOT NULL,
  `level` int(10) NOT NULL DEFAULT '1',
  `points` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

