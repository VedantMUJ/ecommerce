# E-commerce Application

A full-stack e-commerce application built with React and Spring Boot.

## Features

### Frontend
- Responsive design with Material-UI
- Product listing and search
- Product details with image gallery
- Shopping cart functionality
- User authentication
- User profile management
- Order history
- Admin dashboard

### Backend
- RESTful API with Spring Boot
- JWT authentication
- MySQL database
- File upload for product images
- Email notifications
- Payment processing integration

## Tech Stack

### Frontend
- React 18
- Material-UI
- React Router
- Axios
- Redux Toolkit
- React Query

### Backend
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- MySQL
- JWT
- Maven

## Prerequisites

- Node.js 16+
- Java 17+
- MySQL 8+
- Maven

## Getting Started

### Backend Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd ecommerce-backend
   ```
3. Configure MySQL database in `application.properties`
4. Build the project:
   ```bash
   mvn clean install
   ```
5. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

### Authentication
- POST /api/auth/login - User login
- POST /api/auth/register - User registration
- POST /api/auth/refresh - Refresh JWT token

### Products
- GET /api/products - Get all products
- GET /api/products/{id} - Get product by ID
- GET /api/products/search - Search products
- POST /api/products - Create product (Admin)
- PUT /api/products/{id} - Update product (Admin)
- DELETE /api/products/{id} - Delete product (Admin)

### Orders
- GET /api/orders - Get user orders
- GET /api/orders/{id} - Get order details
- POST /api/orders - Create order
- PUT /api/orders/{id}/cancel - Cancel order

### User Profile
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- PUT /api/users/profile/password - Update password
- POST /api/users/profile/avatar - Update avatar

## Environment Variables

### Backend
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
#   e c o m m e r c e  
 #   e c o m m e r c e  
 