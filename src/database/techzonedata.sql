DROP DATABASE IF EXISTS techzone;
CREATE DATABASE techzone;
USE techzone;

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
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
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `price` FLOAT NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `category` VARCHAR(255) NOT NULL,
   `gender` VARCHAR(30) NOT NULL,
   `discount` INT NOT NULL,
   PRIMARY KEY (`id`)
);

INSERT INTO `products` (`name`, `price`, `description`, `image`, `category`, `gender`, `discount`)
VALUES

('Notebook XPG Xenia 14 i5 1135G7 Iris', 759389, 'Una potente laptop con procesador i5 1135G7 y gráficos Iris. Perfecta para trabajar y jugar.', 'laptop.jpg', 1, 'gender', 10),
('PLACA DE VIDEO ASUS TUF NVIDIA GEFORCE RTX 4070TI O12GB GAMING', 1096889, 'Una tarjeta gráfica de alta gama para juegos.', '4070_ti.jpg', 2, 'gender', 20),
('PLACA DE VIDEO POWERCOLOR AMD RADEON RX 6700 XT RED DEVIL 12GB', 452559, 'Una tarjeta gráfica Crimson para los amantes de los videojuegos.', '6700XT.jpg', 2, 'gender', 25),
('PLACA DE VIDEO PALIT NVIDIA GEFORCE RTX 3060 TI DUAL 8GB GDDR6 256BIT LHR', 455639, 'Tarjeta gráfica de alto rendimiento para juegos intensivos.', '3060_ti.jpg', 2, 'gender', 10),
('MICROPROCESADOR AMD RYZEN 7 5800X 8/16 4.7GHZ S/G S/COOLER ZEN3', 299990, 'Procesador Ryzen 7 5800X para un rendimiento excepcional en tu computadora.', 'ryzen7_5800x.jpg', 2, 'gender', 20),
('MICROPROCESADOR CPU INTEL CORE I5 13600K RAPTORLAKE S1700 13VA', 492429, 'Procesador Intel i5 13600K para una experiencia informática rápida y eficiente.', 'intel_i5_13600k.jpg', 2, 'gender', 25),
('MICROPROCESADOR AMD RYZEN 5600G 4.4 GHZ AM4', 156990, 'Procesador Ryzen 5 5600G para juegos y tareas diarias.', 'ryzen5_5600g.jpg', 2, 'gender', 10),
('DISCO SOLIDO SSD WD 1TB M2 NVME SN850X BLACK 7300MB/S', 185629, 'Un disco duro de alta velocidad para almacenamiento de datos.', 'M.2_7300.jpg', 2, 'gender', 20),
('DISCO SOLIDO SSD 960GB KINGSTON SATA III A400', 56729, 'SSD de 960GB para un rendimiento de almacenamiento más rápido.', 'ssd_960gb.jpg', 2, 'gender', 25),
('MEMORIA RAM ADATA 32GB 3600MHZ XPG GAMIXX D45 2X16', 131909, 'Memoria RAM de 16GB para mejorar la velocidad de tu computadora.', '2ram_16gb.jpg', 2, 'gender', 10),
('MEMORIA RAM CORSAIR VENGANCE DDR4 16GB 3200MHZ RGB C16 2X8', 55209, 'Memoria RAM de 8GB para un rendimiento eficiente.', '2ram_8gb.jpg', 2, 'gender', 20),
('TECLADO INALAMBRICO LOGITECH G G915 TKL RGB WHITE MECH', 137079, 'Teclado G915 para una experiencia de escritura de alta calidad.', 'teclado_g915.jpg', 3, 'gender', 25),
('TECLADO HYPERX ALLOY ELITE 2 RGB RED', 114990, 'Teclado HyperX Alloy con iluminación LED y rendimiento excepcional.', 'teclado_HyperxAlloy.jpg', 3, 'gender', 10),
('AURICULAR LOGITECH G PRO GAMING', 122709, 'Auriculares G Pro para una experiencia de audio inmersiva.', 'auricular_gpro.jpg', 3, 'gender', 20),
('AURICULAR HYPERX CLOUD ALPHA ROJO', 94990, 'Auriculares HyperX para un sonido excepcional mientras juegas o escuchas música.', 'auricular_Hyperx.jpg', 3, 'gender', 25);