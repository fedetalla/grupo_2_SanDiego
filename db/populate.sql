------------------------------------------------ erase everything ------------------------------------------------
-- categories --
/*DELETE FROM san_diego.categories;*/
ALTER TABLE san_diego.categories AUTO_INCREMENT=1;

-- products --
DELETE FROM san_diego.products;
ALTER TABLE san_diego.products AUTO_INCREMENT=1;

-- products_users --
DELETE FROM san_diego.products_users;
ALTER TABLE san_diego.products_users AUTO_INCREMENT=1;

-- category users --
DELETE FROM san_diego.user_category;
ALTER TABLE san_diego.user_category AUTO_INCREMENT=1;

-- users --
DELETE FROM san_diego.users;
ALTER TABLE san_diego.users AUTO_INCREMENT=1;


------------------------------------------------ populate everything ------------------------------------------------

-- categories --
INSERT INTO san_diego.categories (id, name) VALUES
(1, "Skates"), (2, "Accesorios");


-- user_category --
INSERT INTO san_diego.user_category (id, name) VALUES
(1, "Admin"), (2, "Visitor");

-- products --
INSERT INTO san_diego.products (id, name, price, description, category_id, image) VALUES 
(1, "Skate Woodo", 20000, "Skate marca Woodo disponible en todas nuestras tiendas", 1, "Skate-woodo.png"),
(2, "Skate Magine", 18000, "Skate marca Magine disponible en todas nuestras tiendas", 1, "Skate-magine.png"),
(3, "Skate Baker", 20000, "Skate marca Baker disponible en todas nuestras tiendas", 1, "Skate-Baker.png"),
(4, "Skate Vans", 15000, "Skate marca Vans disponible en todas nuestras tiendas", 1, "Skate-Vans.png"),
(5, "Santa Cruz", 6450, "Skate marca Santa Cruz disponible en todas nuestras tiendas", 1, "product-image1653341632421.png"),
(6, "ruedas", 500, "Ruedas marca Pirulo disponible en todas nuestras tiendas", 2, "product-image1657402353669.png"),
(7, "track", 1500, "Track marca Element disponible en todas nuestras tiendas", 2, "product-image1657402088780.png"),
(8, "Skate Sheep", 20000, "Skate marca Sheep disponible en todas nuestras tiendas", 1, "OIP.png"),
(9, "Skate Darkstar", 20000, "Skate marca Darkstar disponible en todas nuestras tiendas", 1, "skate-darkstar.png"),
(10, "Skate Element", 20000, "Skate marca Element disponible en todas nuestras tiendas", 1, "Skate-element.png"),
(11, "Skate Foghorn Leghorn", 20000, "Skate marca Foghorn Leghorn disponible en todas nuestras tiendas", 1, "Skateboard-Decks1.png"),
(12, "Skate Santa Cruz", 20000, "Skate marca Santa Cruz disponible en todas nuestras tiendas", 1, "Skateboard-Decks2.png"),
(13, "Skate O'neill", 20000, "Skate marca O'neill disponible en todas nuestras tiendas", 1, "Skateboard-Decks3.png"),
(14, "Skate Hand Santa Cruz", 20000, "Skate marca Hand Santa Cruz disponible en todas nuestras tiendas", 1, "Skateboard-Decks4.png"),
(15, "Skate Zero", 20000, "Skate marca Zero disponible en todas nuestras tiendas", 1, "Skateboard-Decks5.png"),
(16, "Skate Fl!p", 20000, "Skate marca Fl!p disponible en todas nuestras tiendas", 1, "Skateboard-Decks6.png"),
(17, "Kit Camboya",3500, "kit Camboya, origen USA, incluye 4 rulemanes, 4 ruedas, 2 track, 12 tornillos, disponible en todas nuestras tiendas", 2, "kit-Camboya.png"),
(18, "Holder Babylon",1950, "Holder Baylon origen USA,  disponible en todas nuestras tiendas", 2, "holder-babylon.png");

-- users --
INSERT INTO san_diego.users (id, fullName, password, category_id, email, image) VALUES 
(1, "Federico Tallarico", "$2b$10$BlRlITKQ.e6nQveMQxZvMO5Py1VPxwgblIgcbM83zvhKxRboJi2C.",1 ,"federico@sandiego.com","default-image.png"),
(2, "Franco", "$2b$10$4NTJDiDPX2TN3.Io4k3QReDf0p3mXiMj39TheBkk9AkAXavYW1wXC", 2, "franco@sandiego.com", "default-image.png");