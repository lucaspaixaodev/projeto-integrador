CREATE DATABASE cupcake_store;

USE cupcake_store;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  description TEXT
);

INSERT INTO products (name, price, image, description) VALUES
('Cupcake de Chocolate', 9.99, 'assets/images/cupcake-chocolate.jpg', 'Delicioso cupcake de chocolate rico e cremoso, coberto com ganache de chocolate belga e raspas de chocolate amargo.'),
('Cupcake de Baunilha', 8.99, 'assets/images/cupcake-baunilha.jpeg', 'Cupcake clássico de baunilha com massa macia e aroma irresistível, decorado com buttercream de baunilha e confeitos coloridos.'),
('Cupcake de Morango', 10.99, 'assets/images/cupcake-morango.png', 'Cupcake fresco de morango com pedaços de fruta na massa, coberto com chantilly de morango e decorado com uma morango fresco.'),
('Cupcake de Limão', 9.49, 'assets/images/cupcake-limao.jpg', 'Cupcake cítrico de limão siciliano, com cobertura de merengue italiano e raspas de limão caramelizadas.'),
('Cupcake de Cenoura', 8.99, 'assets/images/cupcake-cenoura.jpg', 'Cupcake úmido de cenoura com especiarias, coberto com frosting de cream cheese e decorado com minicenouras de açúcar.'),
('Cupcake de Frutas Vermelhas', 11.99, 'assets/images/cupcake-frutas-vermelhas.jpg', 'Cupcake recheado com mix de frutas vermelhas, coberto com mousse de frutas vermelhas e decorado com frutas frescas.'),
('Cupcake de Caramelo', 10.49, 'assets/images/cupcake-caramelo.jpg', 'Cupcake de caramelo salgado com núcleo de caramelo líquido, coberto com buttercream de caramelo e decorado com flocos de sal marinho.');