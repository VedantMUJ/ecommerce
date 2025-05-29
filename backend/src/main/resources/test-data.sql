-- Test User Data
INSERT INTO users (username, password, email, created_at, updated_at) VALUES
('test_user1', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'test1@example.com', NOW(), NOW()),
('test_user2', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'test2@example.com', NOW(), NOW());

-- Test Product Data
INSERT INTO products (name, description, price, image_url, created_at, updated_at) VALUES
('Test Product 1', 'Test Description 1', 99.99, 'https://example.com/test1.jpg', NOW(), NOW()),
('Test Product 2', 'Test Description 2', 149.99, 'https://example.com/test2.jpg', NOW(), NOW()),
('Test Product 3', 'Test Description 3', 199.99, 'https://example.com/test3.jpg', NOW(), NOW());

-- Test Cart Data
INSERT INTO cart (user_id, created_at, updated_at) VALUES
(1, NOW(), NOW());

-- Test Cart Items
INSERT INTO cart_items (cart_id, product_id, quantity, unit_price, total_price, created_at, updated_at) VALUES
(1, 1, 2, 99.99, 199.98, NOW(), NOW()),
(1, 2, 1, 149.99, 149.99, NOW(), NOW());

-- Test Order Data
INSERT INTO orders (user_id, total_amount, status, created_at, updated_at) VALUES
(1, 349.97, 'pending', NOW(), NOW());

-- Test Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price, created_at, updated_at) VALUES
(1, 1, 2, 99.99, 199.98, NOW(), NOW()),
(1, 2, 1, 149.99, 149.99, NOW(), NOW());

-- Verify Data
SELECT 'Users' as 'Table', COUNT(*) as 'Count' FROM users
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Cart', COUNT(*) FROM cart
UNION ALL
SELECT 'Cart Items', COUNT(*) FROM cart_items
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Order Items', COUNT(*) FROM order_items; 