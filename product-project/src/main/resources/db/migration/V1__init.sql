CREATE TABLE products (
                          id INT NOT NULL AUTO_INCREMENT,
                          name varchar(100) NOT NULL,
                          description varchar(255) NULL,
                          price float NOT NULL,
                          creation DATE DEFAULT NULL,
                          PRIMARY KEY (id)
);