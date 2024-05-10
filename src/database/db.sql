CREATE TABLE restaurants (
 id BIGSERIAL PRIMARY KEY NOT NULL,
 name VARCHAR(50) NOT NULL,
 price_range INT NOT NULL check(price_range >= 1 and price_range<= 5),
 location VARCHAR(50)
)

INSERT INTO restaurant(name, location, price_range) values('mcdonalds', 'new york', 5)