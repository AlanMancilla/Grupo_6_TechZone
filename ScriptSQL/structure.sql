DROP DATABASE IF EXISTS techzone;
CREATE DATABASE techzone;
USE techzone;

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `last_name` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `birthday` DATE DEFAULT NULL,
   `age` INT DEFAULT NULL,
   `adress` VARCHAR(255) DEFAULT NULL,
   `avatar` VARCHAR(255) NOT NULL DEFAULT 'userDefault.png',
   `role` VARCHAR(255) NOT NULL DEFAULT 'cliente',
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `price` FLOAT NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `category` VARCHAR(255) NOT NULL,
   `gender` VARCHAR(255),
   `discount` INT NOT NULL,
   PRIMARY KEY (`id`)
);

INSERT INTO `products` (`name`, `price`, `description`, `image`, `category`, `discount`)
VALUES
('Notebook XPG Xenia 14 i5 1135G7 Iris', 759389, 'Una potente laptop con procesador i5 1135G7 y gráficos Iris. Perfecta para trabajar y jugar.', 'laptop.jpg', 'Electronica',  10),
('NOTEBOOK APPLE MACBOOK PRO M1 13 INCHES 8GB 256GB SPACE GREY', 2512389, 'Con el chip M1, la MacBook Pro de 13 pulgadas alcanza un nuevo nivel de potencia y velocidad. El CPU es hasta 2.8 veces más rápido y los gráficos son hasta 5 veces más veloces.', 'macbook.jpg', 'Electronica',  15),
('PLACA DE VIDEO ASUS TUF NVIDIA GEFORCE RTX 4070TI O12GB GAMING', 1096889, 'Una tarjeta gráfica de alta gama para juegos.', '4070_ti.jpg', 'Hardware', 20),
('PLACA DE VIDEO POWERCOLOR AMD RADEON RX 6700 XT RED DEVIL 12GB', 452559, 'Una tarjeta gráfica Crimson para los amantes de los videojuegos.', '6700XT.jpg', 'Hardware', 25),
('PLACA DE VIDEO PALIT NVIDIA GEFORCE RTX 3060 TI DUAL 8GB GDDR6 256BIT LHR', 455639, 'Tarjeta gráfica de alto rendimiento para juegos intensivos.', '3060_ti.jpg', 'Hardware', 10),
('MICROPROCESADOR AMD RYZEN 7 5800X 8/16 4.7GHZ S/G S/COOLER ZEN3', 299990, 'Procesador Ryzen 7 5800X para un rendimiento excepcional en tu computadora.', 'ryzen7_5800x.jpg', 'Hardware', 20),
('MICROPROCESADOR CPU INTEL CORE I5 13600K RAPTORLAKE S1700 13VA', 492429, 'Procesador Intel i5 13600K para una experiencia informática rápida y eficiente.', 'intel_i5_13600k.jpg', 'Hardware', 25),
('MICROPROCESADOR AMD RYZEN 5600G 4.4 GHZ AM4', 156990, 'Procesador Ryzen 5 5600G para juegos y tareas diarias.', 'ryzen5_5600g.jpg', 'Hardware', 10),
('DISCO SOLIDO SSD WD 1TB M2 NVME SN850X BLACK 7300MB/S', 185629, 'Un disco duro de alta velocidad para almacenamiento de datos.', 'M.2_7300.jpg', 'Hardware', 20),
('DISCO SOLIDO SSD 960GB KINGSTON SATA III A400', 56729, 'SSD de 960GB para un rendimiento de almacenamiento más rápido.', 'ssd_960gb.jpg', 'Hardware', 25),
('MEMORIA RAM ADATA 32GB 3600MHZ XPG GAMIXX D45 2X16', 131909, 'Memoria RAM de 16GB para mejorar la velocidad de tu computadora.', '2ram_16gb.jpg', 'Hardware', 10),
('MEMORIA RAM CORSAIR VENGANCE DDR4 16GB 3200MHZ RGB C16 2X8', 55209, 'Memoria RAM de 8GB para un rendimiento eficiente.', '2ram_8gb.jpg', 'Hardware', 20),
('TECLADO INALAMBRICO LOGITECH G G915 TKL RGB WHITE MECH', 137079, 'Teclado G915 para una experiencia de escritura de alta calidad.', 'teclado_g915.jpg', 'Perifericos', 25),
('TECLADO HYPERX ALLOY ELITE 2 RGB RED', 114990, 'Teclado HyperX Alloy con iluminación LED y rendimiento excepcional.', 'teclado_HyperxAlloy.jpg', 'Perifericos', 10),
('AURICULAR LOGITECH G PRO GAMING', 122709, 'Auriculares G Pro para una experiencia de audio inmersiva.', 'auricular_gpro.jpg', 'Perifericos', 20),
('AURICULAR HYPERX CLOUD ALPHA ROJO', 94990, 'Auriculares HyperX para un sonido excepcional mientras juegas o escuchas música.', 'auricular_Hyperx.jpg', 'Perifericos', 25);

INSERT INTO `users` (`name`, `last_name`, `email`, `password`, `avatar`, `role`)
VALUES( 'admin', 'admin', 'admin@gmail.com' , /* #Admin12 */'$2a$10$U7qeoMMkazR45r6s1GbuR.TbMgg4OabSfd0nCCtKUhqFhr2QUTj2K', 'userDefault.png', 'Admin');