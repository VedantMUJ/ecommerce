-- Create users table first since it's referenced by other tables
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create cart items table
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create suspicious_activities table
CREATE TABLE IF NOT EXISTS suspicious_activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    username VARCHAR(255),
    activity_type VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    attempt_count INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ip_address (ip_address),
    INDEX idx_username (username),
    INDEX idx_activity_type (activity_type),
    INDEX idx_status (status),
    INDEX idx_timestamp (timestamp)
);

-- Create audit_logs table for tracking all security-related events
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    ip_address VARCHAR(45) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_details TEXT,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_ip_address (ip_address),
    INDEX idx_event_type (event_type),
    INDEX idx_timestamp (timestamp)
);

-- Create blocked_ips table for IP-based blocking
CREATE TABLE IF NOT EXISTS blocked_ips (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL UNIQUE,
    reason VARCHAR(255),
    blocked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ip_address (ip_address),
    INDEX idx_blocked_until (blocked_until)
);

-- Create security_settings table for configurable security parameters
CREATE TABLE IF NOT EXISTS security_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_setting_key (setting_key)
);

-- Create security_events table for tracking specific security threats
CREATE TABLE IF NOT EXISTS security_events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_id BIGINT,
    request_path VARCHAR(255),
    request_method VARCHAR(10),
    request_headers TEXT,
    request_body TEXT,
    response_status INT,
    error_message TEXT,
    stack_trace TEXT,
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_event_type (event_type),
    INDEX idx_severity (severity),
    INDEX idx_ip_address (ip_address),
    INDEX idx_user_id (user_id),
    INDEX idx_timestamp (timestamp)
);

-- Create security_event_types table for predefined event types
CREATE TABLE IF NOT EXISTS security_event_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_code VARCHAR(50) NOT NULL UNIQUE,
    event_name VARCHAR(100) NOT NULL,
    description TEXT,
    default_severity VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_event_code (event_code)
);

-- Insert sample users
INSERT INTO users (username, password, email, created_at, updated_at) VALUES
('user1', 'hashed_password_1', 'user1@example.com', NOW(), NOW()),
('user2', 'hashed_password_2', 'user2@example.com', NOW(), NOW());

-- Insert sample products
INSERT INTO products (name, description, price, image_url, created_at, updated_at) VALUES
('Product 1', 'Description for Product 1', 99.99, 'http://example.com/image1.jpg', NOW(), NOW()),
('Product 2', 'Description for Product 2', 149.99, 'http://example.com/image2.jpg', NOW(), NOW());

-- Insert sample cart
INSERT INTO cart (user_id, created_at, updated_at) VALUES
(1, NOW(), NOW());

-- Insert sample cart items
INSERT INTO cart_items (cart_id, product_id, quantity, unit_price, total_price, created_at, updated_at) VALUES
(1, 1, 2, 99.99, 199.98, NOW(), NOW()),
(1, 2, 1, 149.99, 149.99, NOW(), NOW());

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status, created_at, updated_at) VALUES
(1, 349.97, 'completed', NOW(), NOW());

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price, created_at, updated_at) VALUES
(1, 1, 2, 99.99, 199.98, NOW(), NOW()),
(1, 2, 1, 149.99, 149.99, NOW(), NOW());

-- Insert default security settings
INSERT INTO security_settings (setting_key, setting_value, description) VALUES
('MAX_FAILED_LOGIN_ATTEMPTS', '5', 'Maximum number of failed login attempts before account lockout'),
('ACCOUNT_LOCKOUT_DURATION', '30', 'Account lockout duration in minutes'),
('PASSWORD_RESET_TOKEN_EXPIRY', '24', 'Password reset token expiry in hours'),
('SUSPICIOUS_ACTIVITY_THRESHOLD', '10', 'Number of attempts before marking activity as high risk'),
('IP_BLOCK_DURATION', '60', 'IP block duration in minutes'),
('ENABLE_IP_BLOCKING', 'true', 'Enable IP-based blocking'),
('ENABLE_ACCOUNT_LOCKOUT', 'true', 'Enable account lockout after failed attempts'),
('ENABLE_SECURITY_EVENT_LOGGING', 'true', 'Enable detailed security event logging'),
('MAX_REQUEST_SIZE', '1048576', 'Maximum request size in bytes'),
('ENABLE_XSS_PROTECTION', 'true', 'Enable XSS protection'),
('ENABLE_CSRF_PROTECTION', 'true', 'Enable CSRF protection'),
('ENABLE_SQL_INJECTION_PROTECTION', 'true', 'Enable SQL injection protection')
ON DUPLICATE KEY UPDATE
    setting_value = VALUES(setting_value),
    description = VALUES(description);

-- Insert default security event types
INSERT INTO security_event_types (event_code, event_name, description, default_severity) VALUES
('BRUTE_FORCE_ATTEMPT', 'Brute Force Attempt', 'Multiple failed login attempts from the same IP', 'HIGH'),
('SQL_INJECTION_ATTEMPT', 'SQL Injection Attempt', 'Potential SQL injection attack detected', 'HIGH'),
('XSS_ATTEMPT', 'XSS Attack Attempt', 'Potential XSS attack detected', 'HIGH'),
('CSRF_ATTEMPT', 'CSRF Attack Attempt', 'Potential CSRF attack detected', 'HIGH'),
('PATH_TRAVERSAL_ATTEMPT', 'Path Traversal Attempt', 'Potential path traversal attack detected', 'HIGH'),
('FILE_UPLOAD_ATTEMPT', 'Malicious File Upload', 'Attempt to upload potentially malicious file', 'HIGH'),
('RATE_LIMIT_EXCEEDED', 'Rate Limit Exceeded', 'Request rate limit exceeded', 'MEDIUM'),
('INVALID_TOKEN', 'Invalid Security Token', 'Invalid or expired security token used', 'MEDIUM'),
('SUSPICIOUS_IP', 'Suspicious IP Address', 'Activity from known suspicious IP address', 'MEDIUM'),
('UNUSUAL_ACTIVITY', 'Unusual Activity Pattern', 'Unusual pattern of activity detected', 'LOW')
ON DUPLICATE KEY UPDATE
    event_name = VALUES(event_name),
    description = VALUES(description),
    default_severity = VALUES(default_severity);

CREATE DATABASE IF NOT EXISTS eshop;
USE eshop; 