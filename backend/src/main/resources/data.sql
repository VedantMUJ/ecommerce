-- Insert more sample products
INSERT INTO products (name, description, price, image_url, created_at, updated_at) VALUES
('Smartphone X', 'Latest smartphone with advanced features', 799.99, 'https://example.com/smartphone-x.jpg', NOW(), NOW()),
('Laptop Pro', 'High-performance laptop for professionals', 1299.99, 'https://example.com/laptop-pro.jpg', NOW(), NOW()),
('Wireless Earbuds', 'Premium wireless earbuds with noise cancellation', 199.99, 'https://example.com/earbuds.jpg', NOW(), NOW()),
('Smart Watch', 'Fitness and health tracking smartwatch', 249.99, 'https://example.com/smartwatch.jpg', NOW(), NOW()),
('Gaming Console', 'Next-gen gaming console with 4K support', 499.99, 'https://example.com/gaming-console.jpg', NOW(), NOW()),
('Bluetooth Speaker', 'Portable waterproof bluetooth speaker', 89.99, 'https://example.com/speaker.jpg', NOW(), NOW()),
('Tablet Ultra', 'Thin and light tablet with high-resolution display', 599.99, 'https://example.com/tablet.jpg', NOW(), NOW()),
('Camera Pro', 'Professional DSLR camera with 4K video', 1299.99, 'https://example.com/camera.jpg', NOW(), NOW());

-- Insert more sample users
INSERT INTO users (username, password, email, created_at, updated_at) VALUES
('john_doe', 'hashed_password_3', 'john@example.com', NOW(), NOW()),
('jane_smith', 'hashed_password_4', 'jane@example.com', NOW(), NOW()),
('admin_user', 'hashed_password_5', 'admin@example.com', NOW(), NOW());

-- Insert more sample orders
INSERT INTO orders (user_id, total_amount, status, created_at, updated_at) VALUES
(2, 999.98, 'processing', NOW(), NOW()),
(3, 1499.98, 'shipped', NOW(), NOW()),
(4, 799.99, 'delivered', NOW(), NOW());

-- Insert more sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price, created_at, updated_at) VALUES
(2, 3, 1, 799.99, 799.99, NOW(), NOW()),
(2, 4, 1, 199.99, 199.99, NOW(), NOW()),
(3, 5, 1, 1299.99, 1299.99, NOW(), NOW()),
(3, 6, 1, 199.99, 199.99, NOW(), NOW()),
(4, 7, 1, 799.99, 799.99, NOW(), NOW()); 