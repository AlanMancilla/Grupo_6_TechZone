CREATE TABLE `users` (
   `id` INT,
   `name` VARCHAR(255) NOT NULL,
   `last_name` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `birthday` DATE NOT NULL,
   `age` INT NOT NULL,
   `adress` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT,
   `name` VARCHAR(255) NOT NULL,
   `price` FLOAT NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `category` VARCHAR(255) NOT NULL,
   `gender` VARCHAR(30) NOT NULL,
   `discount` INT NOT NULL,
   PRIMARY KEY (`id`)
);
