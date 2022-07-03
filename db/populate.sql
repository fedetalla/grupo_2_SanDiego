------------------------------------------------ erase everything ------------------------------------------------
-- categories --
DELETE FROM san_diego.categories;
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
(6, "ruedas", 500, "Ruedas marca Pirulo disponible en todas nuestras tiendas", 2, "default-image.png"),
(7, "track", 1500, "Track marca Element disponible en todas nuestras tiendas", 2, "default-image.png");

-- users --
INSERT INTO san_diego.users (id, fullName, password, category_id, email, image) VALUES 
(1, "Federico Tallarico", "$2b$10$BlRlITKQ.e6nQveMQxZvMO5Py1VPxwgblIgcbM83zvhKxRboJi2C.",1 ,"federico@sandiego.com","default-image.png"),
(2, "Franco", "$2b$10$4NTJDiDPX2TN3.Io4k3QReDf0p3mXiMj39TheBkk9AkAXavYW1wXC", 2, "franco@sandiego.com", "default-image.png");



