const db = require('../config/db');

class Product {
    static async createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                category VARCHAR(100),
                image VARCHAR(255),
                stock INT DEFAULT 0,
                featured BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        try {
            await db.query(sql);
            console.log('Products table created or already exists');
        } catch (error) {
            console.error('Error creating products table:', error);
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
            return rows;
        } catch (error) {
            console.error('Error finding products:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error finding product by id:', error);
            throw error;
        }
    }

    static async create(productData) {
        try {
            const [result] = await db.query(
                'INSERT INTO products (name, description, price, category, image, stock, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [productData.name, productData.description, productData.price, productData.category, productData.image, productData.stock, productData.featured]
            );
            return { id: result.insertId, ...productData };
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    static async update(id, productData) {
        try {
            await db.query(
                'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ?, stock = ?, featured = ? WHERE id = ?',
                [productData.name, productData.description, productData.price, productData.category, productData.image, productData.stock, productData.featured, id]
            );
            return { id, ...productData };
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            await db.query('DELETE FROM products WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}

module.exports = Product; 