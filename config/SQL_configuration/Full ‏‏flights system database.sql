
create database flight_system;

use flight_system;

create table flights (
	id int primary key auto_increment,
    Airline_company_id int,
    Origin_contry_id int,
    Destination_country_id int,
    Departure_time datetime,
    Landing_time datetime,
    Remaining_tickets int not null
);

create table airline_companies(
	id int primary key auto_increment,
    Company_name varchar(50) unique,
    Country_id int,
    User_name varchar(50) unique,
    Password varchar(25)
);

alter table flights
add constraint fk_Airline_company_id
foreign key(Airline_company_id) references airline_companies(id);

CREATE TABLE `flight_system`.`countries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE);

ALTER TABLE `flight_system`.`airline_companies` 
ADD INDEX `fk_country_id_idx` (`Country_id` ASC) VISIBLE;

ALTER TABLE `flight_system`.`airline_companies` 
ADD CONSTRAINT `fk_country_id`
  FOREIGN KEY (`Country_id`)
  REFERENCES `flight_system`.`countries` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

alter table flights
add constraint `fk_Origin_contry_id`
foreign key(`Origin_contry_id`) references countries(id);

alter table flights
add constraint fk_Destination_country_id
foreign key(`Destination_country_id`) references countries(id);

create table tickets(
	id int not null auto_increment,
    Flight_id int,
    Customer_id int,
    primary key(id)
);

alter table tickets
add unique fk_flightsAndCustomers_id(Flight_id, Customer_id);

alter table tickets
add constraint `fk_Flight_id`
foreign key(`Flight_id`) references flights(id);

CREATE TABLE customers (
	id INT NOT NULL AUTO_INCREMENT,
	First_name VARCHAR (45),
	Last_name VARCHAR (45),
	Address VARCHAR (45),
	Phone_number VARCHAR (45) UNIQUE,
	Credit_card_number VARCHAR (45) UNIQUE,
	User_name VARCHAR (45) UNIQUE,
	User_password VARCHAR (45),
	PRIMARY KEY (id)
);

alter table tickets
add constraint `fk_customers_id`
foreign key(Customer_id) references customers(id);

create table Adminstrators(
	id int not null auto_increment,
    First_name varchar(45) not null,
    Last_name varchar(45) not null,
    User_name varchar(45) unique not null,
    Password varchar(45) not null,
    primary key(id)
);

use flight_system;

insert into countries (id, Name)
values 
(1, 'Afghanistan'), (2, 'Albania'), (3, 'Algeria'), (4, 'Andorra'), (5, 'Angola'), (6, 'Antigua and Barbuda'), (7, 'Argentina'), (8, 'Armenia'), (9, 'Australia'), (10, 'Austria'), 
(11, 'Azerbaijan'), (12, 'Bahamas'), (13, 'Bahrain'), (14, 'Bangladesh'), (15, 'Barbados'), (16, 'Belarus'), (17, 'Belgium'), (18, 'Belize'), (19, 'Benin'), (20, 'Bhutan'), (21, 'Bolivia'), 
(22, 'Bosnia and Herzegovina'), (23, 'Botswana'), (24, 'Brazil'), (25, 'Brunei'), (26, 'Bulgaria'), (27, 'Burkina Faso'), (28, 'Burundi'), (29, 'Cabo Verde'), (30, 'Cambodia'), (31, 'Cameroon'), 
(32, 'Canada'), (33, 'Central African Republic'), (34, 'Chad'), (35, 'Chile'), (36, 'China'), (37, 'Colombia'), (38, 'Comoros'), (39, 'Congo (Congo-Brazzaville)'), (40, 'Costa Rica'), 
(41, 'Croatia'), (42, 'Cuba'), (43, 'Cyprus'), (44, 'Czechia (Czech Republic)'), (45, 'Democratic Republic of the Congo'), (46, 'Denmark'), (47, 'Djibouti'), (48, 'Dominica'), 
(49, 'Dominican Republic'), (50, 'Ecuador'), (51, 'Egypt'), (52, 'El Salvador'), (53, 'Equatorial Guinea'), (54, 'Eritrea'), (55, 'Estonia'), (56, 'Eswatini (fmr. "Swaziland")'), 
(57, 'Ethiopia'), (58, 'Fiji'), (59, 'Finland'), (60, 'France'), (61, 'Gabon'), (62, 'Gambia'), (63, 'Georgia'), (64, 'Germany'), (65, 'Ghana'), (66, 'Greece'), (67, 'Grenada'), 
(68, 'Guatemala'), (69, 'Guinea'), (70, 'Guinea-Bissau'), (71, 'Guyana'), (72, 'Haiti'), (73, 'Honduras'), (74, 'Hungary'), (75, 'Iceland'), (76, 'India'), (77, 'Indonesia'), (78, 'Iran'), 
(79, 'Iraq'), (80, 'Ireland'), (81, 'Israel'), (82, 'Italy'), (83, 'Jamaica'), (84, 'Japan'), (85, 'Jordan'), (86, 'Kazakhstan'), (87, 'Kenya'), (88, 'Kiribati'), (89, 'Kuwait'), (90, 'Kyrgyzstan'), 
(91, 'Laos'), (92, 'Latvia'), (93, 'Lebanon'), (94, 'Lesotho'), (95, 'Liberia'), (96, 'Libya'), (97, 'Liechtenstein'), (98, 'Lithuania'), (99, 'Luxembourg'), (100, 'Madagascar'), (101, 'Malawi'), 
(102, 'Malaysia'), (103, 'Maldives'), (104, 'Mali'), (105, 'Malta'), (106, 'Marshall Islands'), (107, 'Mauritania'), (108, 'Mauritius'), (109, 'Mexico'), (110, 'Micronesia'), (111, 'Moldova'), 
(112, 'Monaco'), (113, 'Mongolia'), (114, 'Montenegro'), (115, 'Morocco'), (116, 'Mozambique'), (117, 'Myanmar (formerly Burma)'), (118, 'Namibia'), (119, 'Nauru'), (120, 'Nepal'), 
(121, 'Netherlands'), (122, 'New Zealand'), (123, 'Nicaragua'), (124, 'Niger'), (125, 'Nigeria'), (126, 'North Korea'), (127, 'North Macedonia'), (128, 'Norway'), (129, 'Oman'), (130, 'Pakistan'), 
(131, 'Palau'), (132, 'Panama'), (133, 'Papua New Guinea'), (134, 'Paraguay'), (135, 'Peru'), (136, 'Philippines'), (137, 'Poland'), (138, 'Portugal'), (139, 'Qatar'), (140, 'Romania'), 
(141, 'Russia'), (142, 'Rwanda'), (143, 'Saint Kitts and Nevis'), (144, 'Saint Lucia'), (145, 'Saint Vincent and the Grenadines'), (146, 'Samoa'), (147, 'San Marino'), 
(148, 'Sao Tome and Principe'), (149, 'Saudi Arabia'), (150, 'Senegal'), (151, 'Serbia'), (152, 'Seychelles'), (153, 'Sierra Leone'), (154, 'Singapore'), (155, 'Slovakia'), (156, 'Slovenia'), 
(157, 'Solomon Islands'), (158, 'Somalia'), (159, 'South Africa'), (160, 'South Korea'), (161, 'South Sudan'), (162, 'Spain'), (163, 'Sri Lanka'), (164, 'Sudan'), (165, 'Suriname'), 
(166, 'Sweden'), (167, 'Switzerland'), (168, 'Syria'), (169, 'Tajikistan'), (170, 'Tanzania'), (171, 'Thailand'), (172, 'Timor-Leste'), (173, 'Togo'), (174, 'Tonga'), (175, 'Trinidad and Tobago'), 
(176, 'Tunisia'), (177, 'Turkey'), (178, 'Turkmenistan'), (179, 'Tuvalu'), (180, 'Uganda'), (181, 'Ukraine'), (182, 'United Arab Emirates'), (183, 'United Kingdom'), (184, 'United States'), 
(185, 'Uruguay'), (186, 'Uzbekistan'), (187, 'Vanuatu'), (188, 'Vatican City'), (189, 'Venezuela'), (190, 'Vietnam'), (191, 'Yemen'), (192, 'Zambia'), (193, 'Zimbabwe');

insert into airline_companies (id, Company_name, Country_id, User_name, Password)
value 
(1, "Afghanistan Airways", 1, "John Smith", "A1b2"),
(2, "Albania Air", 2, "Emma Johnson", "C3d4"),
(3, "Algeria Airlines", 3, "Michael Brown", "E5f6"),
(4, "Andorra Aviation", 4, "William Wilson", "G7h8"),
(5, "Angola Flights", 5, "Sophia Davis", "I9j0"),
(6, "Antigua and Barbuda Wings", 6, "Oliver Taylor", "K1l2"),
(7, "Argentina Sky", 7, "James Anderson", "M3n4"),
(8, "Armenia Express", 8, "Ava Martinez", "O5p6"),
(9, "Australia Pacific", 9, "Benjamin Thompson", "Q7r8"),
(10, "Austria Alpine", 10, "Isabella Clark", "S9t0"),
(11, "Azerbaijan Caspian", 11, "Alexander White", "U1v2"),
(12, "Bahamas Breeze", 12, "Mia Harris", "W3x4"),
(13, "Bahrain Gulf", 13, "Daniel Lee", "Y5z6"),
(14, "Bangladesh Delta", 14, "Charlotte Lewis", "A7b8"),
(15, "Barbados Caribbean", 15, "Henry Walker", "C9d0"),
(16, "Belarus Eastern", 16, "Amelia Hall", "E1f2"),
(17, "Belgium Brussels", 17, "Joseph Young", "G3h4"),
(18, "Belize Central", 18, "Emily Allen", "I5j6"),
(19, "Benin West", 19, "Samuel King", "K7l8"),
(20, "Bhutan Himalaya", 20, "Abigail Wright", "M9n0"),
(21, "Bolivia Andes Airlines", 21, "Lucas Scott", "N1o2"),
(22, "Bosnia and Herzegovina Airways", 22, "Ella Green", "P3q4"),
(23, "Botswana Safari Airlines", 23, "Liam Adams", "R5s6"),
(24, "Brazilian Skies Airlines", 24, "Chloe Baker", "T7u8"),
(25, "Brunei Royal Air", 25, "Ethan Carter", "V9w0"),
(26, "Bulgaria Airwaves", 26, "Zoe Menashe", "X1y2"),
(27, "Burkina Faso Airlines", 27, "Mason Perez", "Y3z4"),
(28, "Burundi Air Express", 28, "Grace Roberts", "A5b6"),
(29, "Cabo Verde Airlines", 29, "Noah Turner", "C7d8"),
(30, "Cambodia Angkor Air", 30, "Aiden Phillips", "E9f0"),
(31, "Cameroon Airways", 31, "Sofia Campbell", "G1h2"),
(32, "Canada Maple Leaf Airlines", 32, "Jackson Rivera", "I3j4"),
(33, "Central African Republic Airlines", 33, "Lily Cooper", "K5l6"),
(34, "Chad Air Services", 34, "Gabriel Reed", "M7n8"),
(35, "Chile Andes Airlines", 35, "Scarlett Morgan", "O9p0"),
(36, "China Eastern Airlines", 36, "David Bell", "Q1r2"),
(37, "Colombia Coffee Airlines", 37, "Victoria Murphy", "S3t4"),
(38, "Comoros Island Air", 38, "Isaac Rogers", "U5v6"),
(39, "Congo Airways", 39, "Layla Edwards", "W7x8"),
(40, "Costa Rica Nature Air", 40, "Henry Ward", "Y9z0"),
(41, "Croatia Adriatic Airlines", 41, "Elena Price", "A1b2"),
(42, "Cuba Libre Airlines", 42, "Owen Bennett", "C3d4"),
(43, "Cyprus Mediterranean Air", 43, "Mila Hughes", "E5f6"),
(44, "Czechia Bohemian Airlines", 44, "Lucas Fisher", "G7h8"),
(45, "Democratic Republic of the Congo Airlines", 45, "Sophie Jameson", "I9j0"),
(46, "Denmark Viking Air", 46, "Leo Simmons", "K1l2"),
(47, "Djibouti Red Sea Air", 47, "Hannah Foster", "M3n4"),
(48, "Dominica Nature Wings", 48, "Jackson Gray", "O5p6"),
(49, "Dominican Republic Caribbean Air", 49, "Chloe Rivera", "Q7r8"),
(50, "Ecuador Andes Express", 50, "Evelyn Diaz", "S9t0"),
(51, "Egypt Nile Airlines", 51, "Matthew Torres", "U1v2"),
(52, "El Salvador Sunshine Air", 52, "Avery Sanchez", "W3x4"),
(53, "Equatorial Guinea Gulf Air", 53, "Isaiah Morales", "Y5z6"),
(54, "Eritrea Red Sea Airlines", 54, "Ella Ortega", "A7b8"),
(55, "Estonia Baltic Air", 55,"Oliver Knight","C9d0"),
(56,"Eswatini Swazi Airways ",56 ,"Amelia Woodward ","E1f2 "),
(57,"Ethiopia Horn of Africa Airlines ",57 ,"Liam Brooks ","G3h4 "),
(58,"Fiji Island Air ",58 ,"Zoe Sanders ","I5j6 "),
(59,"Finland Northern Lights Airline ",59 ,"James Bennett ","K7l8 "),
(60, "France Parisian Airways", 60, "Sophia Fisher", "S9t0"),
(61, "Gabon Gabonese Air", 61, "Lucas Hughes", "Y1z2"),
(62, "Gambia Gambia Bird", 62, "Mila Perry", "A3b4"),
(63, "Georgia Caucasus Airlines", 63, "Isaac Long", "C5d6"),
(64, "Germany Lufthansa Airways", 64, "Layla Griffin", "E7f8"),
(65, "Ghana Gold Coast Airlines", 65, "Noah Ramirez", "G9h0"),
(66, "Greece Aegean Airlines", 66, "yakov Rivera", "I1j2"),
(67, "Grenada Spice Island Air", 67, "Ethan Cooper", "K3l4"),
(68, "Guatemala Maya Airways", 68, "Grace Rogers", "M5n6"),
(69, "Guinea Bissau Bissau Air", 69, "David Edwards", "O7p8"),
(70, "Guinea Conakry Airlines", 70, "Sofia Hayes", "Q9r0"),
(71, "Guyana Amazon Airways", 71, "Jackson Morgan", "S1t2"),
(72, "Haiti Caribbean Sky", 72, "Lily Campbell", "U3v4"),
(73, "Honduras Central American Air", 73, "Gabriel Bell", "W5x6"),
(74, "Hungary Hungarian Airlines", 74, "Mia Reed", "Y7z8"),
(75, "Iceland Northern Lights Aviation", 75, "Leo Stewart", "A9b0"),
(76, "India Maharaja Airways", 76, "Ava Price", "C1d2"),
(77, "Indonesia Bali Air Express", 77, "Noah Wright", "E3f4"),
(78, "Iran Persian Gulf Airlines", 78, "Isabella faril", "G5h6"),
(79, "Iraq Mesopotamia Airways", 79, "Samuel Lee", "I7j8"),
(80, "Ireland Emerald Isle Aviation", 80, "Olivia Morgan", "K9l0"),
(81, "Israel Holy Land Airlines", 81, "Daniel Bublil", "M1n2"),
(82, "Italy Mediterranean Wings", 82,"Sophia Martini","C3d4"),
(83,"Jamaica Reggae Airways ",83,"James Wilson ","E5f6 "),
(84,"Japan Sakura Airlines ",84,"Emma Brown ","G7h8 "),
(85,"Jordan Petra Air ",85,"Michael Davis ","I9j0 "),
(86,"Kazakhstan Steppe Airlines ",86,"Olivia Garcia ","K1l2 "),
(87,"Kenya Safari Sky ",87,"Lucas Martinez ","M3n4 "),
(88, "Kiribati Island Hoppers", 88, "Chloe Anderson", "O5p6"),
(89, "Kuwait Arabian Gulf Airways", 89, "Liam Taylor", "Q7r8"),
(90, "Kyrgyzstan Tien Shan Airlines", 90, "Isabella Thomas", "S9t0"),
(91, "Laos Mekong River Air", 91, "David Jackson", "U1v2"),
(92, "Latvia Baltic Wings", 92, "Layla White", "W3x4"),
(93, "Lebanon Cedar Airways", 93, "James Harris", "Y5z6"),
(94, "Lesotho Mountain Kingdom Air", 94, "Emily Lewis", "A7b8"),
(95, "Liberia Liberty Aviation", 95, "jeki Young", "C9d0"),
(96, "Libya Desert Sky Airlines", 96, "Sofia Hall", "E1f2"),
(97, "Liechtenstein Alpine Air Service", 97, "Noah Allen", "G3h4"),
(98, "Lithuania Baltic Sea Airlines", 98, "Chloe King", "I5j6"),
(99, "Luxembourg Grand Duchy Airways", 99, "Samuel Brown", "A7b8"),
(100, "Madagascar Lemur Air", 100, "Abigail Scott", "B9c0"),
(101, "Malawi Lake Malawi Airways", 101, "Oliver Carter", "D1e2"),
(102, "Malaysia Borneo Sky", 102, "Carmela Mitchell", "F3g4"),
(103, "Maldives Paradise Islands Airline", 103, "Liam Turner", "H5i6"),
(104, "Mali Sahara Express", 104, "Emma Davis", "J7k8"),
(105, "Malta Mediterranean Wings", 105, "David Aruya", "L9m0"),
(106, "Marshall Islands Pacific Blue Airline", 106, "Sophia Hall", "N1o2"),
(107, "Mauritania Sahara Aviation", 107, "Jackson Lee", "P3q4"),
(108, "Mauritius Island Hopper Airline", 108, "Ella Adams", "R5s6"),
(109, "Mexico Aztec Airways", 109, "Lucas Johnson", "T7u8"),
(110, "Micronesia Island Hoppers Airline", 110, "Chloe Walker", "V9w0"),
(111, "Moldova Dniester Airline", 111,"Gabriel Young","X1y2"),
(112,"Monaco Riviera Airlines ",112,"Lily Martinez ","Y3z4 "),
(113,"Mongolia Steppe Wings ",113,"Noah Brown ","A5b6 "),
(114,"Montenegro Adriatic Skies ",114,"Sofia Taylor ","B7c8 "),
(115,"Morocco Atlas Airline ",115,"James Lee ","D9e0 "),
(116,"Mozambique Safari Express ",116,"Emma Wilson ","F1g2 "),
(117,"Myanmar Golden Land Airline ",117,"Daniel Harris ","H3i4 "),
(118, "Namibia Desert Sky", 118, "Aviya Clark", "J5k6"),
(119, "Nauru Island Airways", 119, "Liam Nisan", "L7m8"),
(120, "Nepal Himalayan Express", 120, "Keren Adams", "M9n0"),
(121, "Netherlands Dutch Wings", 121, "Henry King", "N1o2"),
(122, "New Zealand KiwiAir", 122, "Chloe Robinson", "P3q4"),
(123, "Nicaragua NicaAir", 123, "Samuel Young", "R5s6"),
(124, "Niger NigerAir", 124, "Alma Wright", "T7u8"),
(125, "Nigeria NaijaAir", 125, "David Mekaw", "V9w0"),
(126, "North Korea KoreanAir", 126, "Emily Thomas", "X1y2"),
(127, "North Macedonia BalkanAir", 127, "Gabriel Jackson", "Y3z4"),
(128, "Norway FjordAir", 128, "Sophia White", "Z5a6"),
(129, "Oman SultanateAir", 129, "Liam Harris", "A7b8"),
(130, "Pakistan IndusAir", 130, "Olivia Smith", "B9c0"),
(131, "Palau PacificAir", 131, "Yonatan Brown", "D1e2"),
(132, "Panama CanalAir", 132, "Mikel Johnson", "F3g4"),
(133, "Papua New Guinea PNGAir", 133, "Daniel chong", "H5i6"),
(134, "Paraguay GuaraniAir", 134, "Zoe Robinson", "J7k8"),
(135, "Peru IncaAir", 135, "Samuel Wilson", "L9m0"),
(136, "Philippines PearlAir", 136,"Sophia Martinez","N1o2"),
(137,"Poland PolishAir ",137,"Lucas Garcia ","P3q4 "),
(138,"Portugal IberianAir ",138,"Emily Clark ","R5s6 "),
(139,"Qatar QatariAir ",139,"Noah Lewis ","T7u8 "),
(140,"Romania CarpathianAir ",140,"Isabella Young ","V9w0 "),
(141,"Russia SiberianAir ",141,"Gabriel King ","X1y2 "),
(142,"Rwanda RwandanAir ",142,"Chloe Adams ","Y3z4 "),
(143,"Saint Kitts and Nevis CaribbeanAir ",143,"Liam Carter ","Z5a6 "),
(144, "Saint Lucia TropicalAir", 144, "Olivia Thomas", "B1c2"),
(145, "Saint Vincent and the Grenadines GrenadineAir", 145, "David Robinson", "D3e4"),
(146, "Samoa PacificWings", 146, "Emma Garcia", "F5g6"),
(147, "San Marino SanMarinoAir", 147, "James Wright", "H7i8"),
(148, "Sao Tome and Principe PrincipeWings", 148, "Zoe Mitchell", "J9k0"),
(149, "Saudi Arabia ArabianWings", 149, "Noah Johnson", "L1m2"),
(150, "Senegal SenegaleseSky", 150, "Ella Brown", "N3o4"),
(151, "Serbia SerbianAir", 151, "Lucas Lee", "P5q6"),
(152, "Seychelles SeychellesSky", 152, "Olivia Harris", "R7s8"),
(153, "Sierra Leone LeoneSky", 153, "Samuel Walker", "T9u0"),
(154, "Singapore SingapuraWings", 154, "Chloe Adams", "V1w2"),
(155, "Slovakia SlovakSky", 155, "Gabriel Maman", "X3y4"),
(156, "Slovenia SlovenianWings", 156, "Emma Scott", "Z5a6"),
(157, "Solomon Islands IslandHopper", 157, "David Martinez", "B7c8"),
(158, "Somalia SomaliSky", 158, "Isabella Wright", "D9e0"),
(159, "South Africa RainbowAir", 159, "James Brown", "F1g2"),
(160, "South Korea HanRiverAir", 160, "Sophia Johnson", "H3i4"),
(161, "South Sudan NileSky", 161, "Noah Bambu", "J5k6"),
(162, "Spain IberianWings", 162, "Ella Mitchell", "L7m8"),
(163, "Sri Lanka CeylonAir", 163, "Lucas Carter", "N9o0"),
(164, "Sudan NileExpress", 164, "Zoe Walker", "P1q2"),
(165, "Suriname AmazonWings", 165, "Gabriel Brown", "R3s4"),
(166, "Sweden NordicWings", 166, "Olivia Johnson", "T5u6"),
(167, "Switzerland SwissSkies", 167, "James Davis", "V7w8"),
(168, "Syria SyrianSky", 168, "Emily White", "X9y0"),
(169, "Tajikistan PamirWings", 169, "Daniel Green", "Z1a2"),
(170, "Tanzania KilimanjaroAir", 170, "Sophia Lewis", "B3c4"),
(171, "Thailand ThaiSky", 171, "Lucas Robinson", "D5e6"),
(172, "Timor-Leste TimorExpress", 172, "Zoe Adams", "F7g8"),
(173, "Togo TogoleseSky", 173, "Samuel Wright", "H9i0"),
(174, "Tonga IslandExpress", 174, "Olivia Hall", "J1k2"),
(175, "Trinidad and Tobago CaribbeanExpress", 175, "David Carter", "L3m4"),
(176, "Tunisia TunisianSkies", 176, "Emma Martinez", "N5o6"),
(177, "Turkey TurkishWings", 177, "James White", "P7q8"),
(178, "Turkmenistan TurkmenSkies", 178, "Isabella Young", "R9s0"),
(179, "Tuvalu TuvaluExpress", 179, "Noah King", "T1u2"),
(180, "Uganda PearlOfAfricaAirlines", 180, "Chloe Wilson", "V3w4"),
(181, "Ukraine UkrainianSkies", 181, "Liam Martinez", "X5y6"),
(182, "United Arab Emirates EmiratesSky", 182, "Olivia Davis", "Z7a8"),
(183, "United Kingdom BritishWings", 183, "James Johnson", "B9c0"),
(184, "United States AmericanDreams", 184, "Sophia Smith", "D1e2"),
(185, "Uruguay UruguayanSkies", 185, "Noah Brown", "F3g4"),
(186, "Uzbekistan SilkRoadAir", 186, "Zoe Garcia", "H5i6"),
(187, "Vanuatu VanuatuIsland", 187, "Moshe Carter", "J7k8"),
(188, "Vatican City PapalFlights", 188, "Isabella Lee", "L9m0"),
(189, "Venezuela VenezuelanSkies", 189, "James Martinez", "N1o2"),
(190, "Vietnam VietJet", 190, "Sophia Robinson", "P3q4"),
(191, "Yemen ArabianSky", 191, "Gal Kariti", "R5s6"),
(192, "Zambia ZambianSkies", 192, "Olivia Clark", "T7u8"),
(193, "Zimbabwe ZimFlights", 193, "Maya Kingo", "V9w0");

insert into flights (id, Airline_company_id, Origin_contry_id, Destination_country_id, Departure_time, Landing_time, Remaining_tickets)
value (1, 23, 56, 89, "2025-03-15 08:30:45", "2025-03-16 10:15:30", 127),
(2, 105, 17, 82, "2025-07-22 14:20:10", "2025-07-23 18:45:55", 203),
(3, 67, 134, 29, "2025-11-05 22:05:30", "2025-11-07 01:30:15", 78),
(4, 189, 42, 115, "2026-01-18 03:45:20", "2026-01-18 17:20:40", 245),
(5, 8, 91, 153, "2026-04-30 11:10:55", "2026-05-01 09:55:25", 32),
(6, 156, 73, 40, "2026-08-12 19:30:40", "2026-08-13 22:15:10", 189),
(7, 34, 128, 95, "2026-12-25 06:15:25", "2026-12-26 04:40:50", 101),
(8, 172, 59, 11, "2027-02-07 16:50:15", "2027-02-08 19:25:35", 220),
(9, 45, 112, 178, "2027-05-21 01:25:50", "2027-05-22 03:10:20", 67),
(10, 193, 25, 87, "2027-09-03 09:40:35", "2027-09-04 11:55:05", 154),
(11, 78, 146, 63, "2025-05-10 17:55:20", "2025-05-11 20:30:45", 89),
(12, 121, 38, 104, "2025-09-28 04:30:10", "2025-09-29 07:15:35", 176),
(13, 56, 169, 21, "2026-02-14 12:45:55", "2026-02-15 15:20:25", 43),
(14, 184, 81, 147, "2026-06-29 20:10:40", "2026-06-30 23:45:05", 210),
(15, 12, 124, 70, "2026-11-11 07:35:25", "2026-11-12 10:10:50", 98),
(16, 150, 47, 132, "2027-03-26 15:00:15", "2027-03-27 17:35:40", 165),
(17, 89, 190, 36, "2027-08-08 22:25:00", "2027-08-10 01:00:25", 54),
(18, 167, 3, 98, "2025-01-01 05:50:45", "2025-01-02 08:25:10", 231),
(19, 30, 136, 54, "2025-04-15 13:15:30", "2025-04-16 15:50:55", 76),
(20, 178, 69, 120, "2025-08-28 20:40:20", "2025-08-29 23:15:45", 143),
(21, 51, 157, 7, "2025-12-11 04:05:10", "2025-12-12 06:40:35", 21),
(22, 139, 14, 73, "2026-03-26 11:30:00", "2026-03-27 14:05:25", 198),
(23, 72, 181, 39, "2026-07-09 18:55:45", "2026-07-10 21:30:10", 65),
(24, 160, 36, 105, "2026-10-22 02:20:35", "2026-10-23 04:55:00", 242),
(25, 23, 149, 71, "2027-01-04 09:45:25", "2027-01-05 12:20:50", 87),
(26, 111, 92, 158, "2027-04-19 17:10:15", "2027-04-20 19:45:40", 154),
(27, 84, 135, 24, "2027-08-02 00:35:05", "2027-08-03 03:10:30", 32),
(28, 172, 58, 90, "2025-02-15 08:00:55", "2025-02-16 10:35:20", 209),
(29, 45, 171, 56, "2025-05-30 15:25:45", "2025-05-31 18:00:10", 76),
(30, 133, 14, 122, "2025-09-12 22:50:35", "2025-09-14 01:25:00", 143),
(31, 96, 157, 8, "2025-12-26 06:15:25", "2025-12-27 08:50:50", 21),
(32, 184, 80, 74, "2026-04-10 13:40:15", "2026-04-11 16:15:40", 198),
(33, 57, 123, 140, "2026-07-24 21:05:05", "2026-07-26 23:40:30", 65),
(34, 145, 46, 106, "2026-11-06 04:30:55", "2026-11-07 07:05:20", 232),
(35, 18, 189, 72, "2027-02-19 11:55:45", "2027-02-20 14:30:10", 99),
(36, 106, 32, 138, "2027-06-04 19:20:35", "2027-06-05 21:55:00", 176),
(37, 79, 175, 25, "2027-09-17 02:45:25", "2027-09-18 05:20:50", 43),
(38, 167, 18, 91, "2025-01-01 10:10:15", "2025-01-02 12:45:40", 220),
(39, 40, 161, 57, "2025-04-15 17:35:05", "2025-04-16 20:10:30", 87),
(40, 128, 4, 123, "2025-07-29 01:00:55", "2025-07-30 03:35:20", 154),
(41, 91, 147, 9, "2025-11-11 08:25:45", "2025-11-12 11:00:10", 32),
(42, 179, 90, 75, "2026-02-24 15:50:35", "2026-02-25 18:25:00", 209),
(43, 52, 133, 141, "2026-06-09 23:15:25", "2026-06-11 01:50:50", 76),
(44, 140, 76, 107, "2026-09-22 06:40:15", "2026-09-23 09:15:40", 143),
(45, 13, 119, 73, "2026-12-06 14:05:05", "2026-12-07 16:40:30", 21),
(46, 101, 62, 139, "2027-03-21 21:30:55", "2027-03-23 00:05:20", 198),
(47, 74, 105, 26, "2027-07-04 04:55:45", "2027-07-05 07:30:10", 65),
(48, 162, 48, 92, "2027-10-17 12:20:35", "2027-10-18 14:55:00", 242),
(49, 35, 191, 58, "2025-01-30 19:45:25", "2025-01-31 22:20:50", 109),
(50, 123, 34, 124, "2025-05-15 03:10:15", "2025-05-16 05:45:40", 176);

insert into customers (id, First_name, Last_name, Address, Phone_number, Credit_card_number, User_name, User_password)
values 
(1, 'Nisim', 'Mizrahi', '127 hertzel Street, Rehovot, IL', '555-123-4567', '4111 1111 1111 1111', 'nisimmizrahi', 'A1B2'),
(2, 'Emma', 'Johnson', '456 Oak Avenue, New York, NY', '555-234-5678', '4222 2222 2222 2222', 'emmajohnson', 'C3D4'),
(3, 'Michael', 'Brown', '789 Maple Lane, Los Angeles, CA', '555-345-6789', '4333 3333 3333 3333', 'michaelbrown', 'E5F6'),
(4, 'Sophia', 'Davis', '321 Pine Drive, Miami, FL', '555-456-7890', '4444 4444 4444 4444', 'sophiadavis', 'G7H8'),
(5, 'James', 'Wilson', '654 Cedar Road, Austin, TX', '555-567-8901', '4555 5555 5555 5555', 'jameswilson', 'J9K1'),
(6, 'Olivia', 'Martinez', '987 Birch Court, Seattle, WA', '555-678-9012', '4666 6666 6666 6666', 'oliviamartinez', 'L2M3'),
(7, 'Liam', 'Anderson', '159 Spruce Street, Denver, CO', '555-789-0123', '4777 7777 7777 7777', 'liamanderson', 'N4P5'),
(8, 'Isabella', 'Garcia', '753 Willow Boulevard, Chicago, IL', '555-890-1234', '4888 8888 8888 8888', 'isabellagarcia', 'Q6R7'),
(9, 'Ethan', 'White', '135 Ash Street, Boston, MA', '555-901-2345', '4999 9999 9999 9999', 'ethanwhite', 'S8T9'),
(10, 'Ava', 'Taylor', '246 Birch Road, Portland, OR', '555-012-3456', '5111 1111 1111 1111', 'avataylor', 'U7V3'),
(11, 'Noah', 'Clark', '357 Redwood Avenue, Phoenix, AZ', '555-123-4568', '5222 2222 2222 2222', 'noahclark', 'X4Y5'),
(12, 'Mia', 'Lewis', '468 Cypress Lane, Atlanta, GA', '555-234-5679', '5333 3333 3333 3333', 'mialewis', 'Z6A2');

insert into tickets (id, Flight_id, Customer_id)
values 
(1, 29, 11), (2, 47, 5), (3, 6, 7), (4, 8, 2), (5, 7, 3), (6, 3, 6), (7, 16, 10), (8, 18, 3), (9, 48, 10), (10, 16, 9), (11, 43, 6),
(12, 42, 9), (13, 1, 9), (14, 19, 2), (15, 2, 4), (16, 19, 1), (17, 6, 2), (18, 14, 8), (19, 1, 8), (20, 49, 12), (21, 4, 2), (22, 19, 4),
(23, 45, 9), (24, 5, 8), (25, 23, 8), (26, 28, 11), (27, 13, 11), (28, 50, 4), (29, 12, 11), (30, 18, 8), (31, 39, 7), (32, 34, 4),
(33, 2, 5), (34, 16, 6), (35, 28, 6), (36, 50, 6), (37, 31, 1), (38, 20, 8), (39, 46, 4), (40, 40, 5), (41, 11, 5), (42, 21, 6),
(43, 25, 2), (44, 22, 5), (45, 20, 1), (46, 39, 9), (47, 43, 10), (48, 1, 1), (49, 11, 9), (50, 6, 12), (51, 3, 9), (52, 39, 4),
(53, 39, 1), (54, 5, 1), (55, 35, 2), (56, 40, 6), (57, 16, 7), (58, 1, 5), (59, 33, 11), (60, 28, 7), (61, 1, 10), (62, 23, 6),
(63, 33, 10), (64, 49, 9), (65, 35, 3), (66, 39, 5), (67, 3, 11), (68, 38, 6), (69, 4, 5), (70, 27, 6), (71, 45, 12), (72, 22, 10),
(73, 34, 10), (74, 47, 12), (75, 25, 9), (76, 35, 9), (77, 10, 5), (78, 39, 11), (79, 26, 12), (80, 36, 3), (81, 7, 2), (82, 27, 8),
(83, 19, 11), (84, 13, 5), (85, 37, 12), (86, 49, 4), (87, 44, 1), (88, 2, 9), (89, 14, 4), (90, 3, 12), (91, 36, 1), (92, 30, 7),
(93, 50, 3), (94, 49, 8), (95, 26, 9), (96, 41, 10), (97, 3, 4), (98, 37, 9), (99, 9, 11), (100, 21, 7);