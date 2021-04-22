DROP DATABASE IF EXISTS Product_DB;
create DATABASE Product_DB;
use Product_DB;

CREATE TABLE Product (
  product_id INTEGER AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price VARCHAR(255) NOT NULL,
  PRIMARY KEY (product_id)
);
CREATE INDEX productindex ON Product(product_id);

CREATE TABLE Features (
  feature_id INTEGER AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  feature VARCHAR(255) NOT NULL,
  value VARCHAR(255),
  PRIMARY KEY (feature_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id)  ON DELETE CASCADE
);
CREATE INDEX Featuresindex ON Features(product_id);

CREATE TABLE Styles (
  style_id INTEGER AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  sale_price VARCHAR(255) DEFAULT NULL,
  original_price VARCHAR(255) NOT NULL,
  default_style BINARY DEFAULT 0 NOT NULL,
  PRIMARY KEY (style_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE
);
CREATE INDEX Stylesindex ON Styles(product_id);

CREATE TABLE Skus (
  sku_id INTEGER AUTO_INCREMENT,
  style_id INTEGER NOT NULL,
  size VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (sku_id),
  FOREIGN KEY (style_id) REFERENCES Styles(style_id) ON DELETE CASCADE
);
CREATE INDEX Skusindex ON Skus(style_id);

 CREATE TABLE Photo (
  photo_id INTEGER AUTO_INCREMENT,
  style_id INTEGER NOT null,
  url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (photo_id),
  FOREIGN KEY (style_id) REFERENCES Styles(style_id) ON DELETE CASCADE
 );
CREATE INDEX Photosindex ON Photo(style_id);

 CREATE TABLE related_product(
  id INTEGER AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  related_id INTEGER NOT NULL,
  UNIQUE(product_id,related_id),
  FOREIGN KEY (related_id) REFERENCES Product(product_id)  ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Product(product_id)  ON DELETE CASCADE,
  primary key(id)
);
CREATE INDEX related_productindex ON related_product(product_id);