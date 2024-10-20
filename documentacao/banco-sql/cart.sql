CREATE TABLE cart (
  user_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);