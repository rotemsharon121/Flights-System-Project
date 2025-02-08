/*
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
*/