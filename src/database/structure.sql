CREATE TABLE `USERS` (
   `id` INT,
   `name` VARCHAR(255) NOT NULL,
   `lastName` VARCHAR(255) NOT NULL,
   `Email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `birthday` DATE NOT NULL,
   `age` INT NOT NULL,
   `adress` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `PRODUCTOS-US` (
   `id` ,
   `producto_id`  NOT NULL,
   `id_us`  NOT NULL,
   `cantidad_productos` BIGINT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT,
   `Name` VARCHAR(255) NOT NULL,
   `price` FLOAT NOT NULL,
   `descripcion` VARCHAR(255) NOT NULL,
   `imagen` VARCHAR(255) NOT NULL,
   `categoria ` VARCHAR(255) NOT NULL,
   `genero` VARCHAR(30) NOT NULL,
   `descuento` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `carrito` (
   `id` ,
   `id_us`  NOT NULL,
   `producto_id`  NOT NULL,
   `precio`  NOT NULL,
   `direccion`  NOT NULL,
   `codigo_desc`  NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `PRODUCTOS-US` ADD CONSTRAINT `FK_1c8d51af-b69b-4817-842c-c88de39a4923` FOREIGN KEY (`id`) REFERENCES `USERS`(`id`)  ;

ALTER TABLE `PRODUCTOS-US` ADD CONSTRAINT `FK_3b8b022d-2701-46f8-af43-4fafd646ac81` FOREIGN KEY (`producto_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `carrito` ADD CONSTRAINT `FK_be0962a1-bec2-4cd0-97d8-67d83f64d645` FOREIGN KEY (`id_us`) REFERENCES `USERS`(`id`)  ;

ALTER TABLE `carrito` ADD CONSTRAINT `FK_10a0d7f1-ee55-454f-8bef-3746141883bc` FOREIGN KEY (`producto_id`) REFERENCES `products`(`id`)  ;
