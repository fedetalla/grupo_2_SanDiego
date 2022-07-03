DROP DATABASE IF EXISTS `san_diego`;
CREATE DATABASE IF NOT EXISTS `san_diego`;
USE `san_diego`;


CREATE TABLE `products` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `price` INT NOT NULL ,
   `description` VARCHAR(255),
   `category_id` INT NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT AUTO_INCREMENT,
   `fullName` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `category_id` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `user_category` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products_users` (
   `id` INT AUTO_INCREMENT,
   `product_id` INT NOT NULL ,
   `user_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_c68b8c24-4b7c-4037-9599-9e66acd52f4b` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_fd2fd558-f6cf-410d-a683-31b4b05a3f52` FOREIGN KEY (`category_id`) REFERENCES `user_category`(`id`)  ;

ALTER TABLE `products_users` ADD CONSTRAINT `FK_d66c7788-b5c1-48f3-a4bd-1394a19e5ec9` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `products_users` ADD CONSTRAINT `FK_242ba915-f240-45ca-8a0e-8d9407ef4b0e` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)  ;