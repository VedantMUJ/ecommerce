import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button,
  Rating,
  Box,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';

const Products = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      description: "High-quality wireless headphones with noise cancellation",
      rating: 4.5,
      category: "Electronics",
      inStock: true
    },
    {
      id: 2,
      name: "Designer Watch",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      description: "Elegant designer watch with premium build quality",
      rating: 4.8,
      category: "Fashion",
      inStock: true
    },
    {
      id: 3,
      name: "Smart Home Speaker",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80",
      description: "Voice-controlled smart speaker with premium sound",
      rating: 4.3,
      category: "Electronics",
      inStock: true
    },
    {
      id: 4,
      name: "Premium Backpack",
      price: 79.99,
      image: "https://img.freepik.com/premium-photo/picture-backpack_931878-312250.jpg?w=800&h=800&fit=crop",
      description: "Durable and stylish backpack for everyday use",
      rating: 4.6,
      category: "Fashion",
      inStock: true
    }
  ];

  const handleAddToCart = () => {
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          textAlign: 'center',
          mb: 6,
          fontWeight: 'bold'
        }}
      >
        Our Products
      </Typography>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        },
        gap: 4,
        width: '100%',
        mx: 'auto'
      }}>
        {products.map((product) => (
          <Card 
            key={product.id}
            sx={{ 
              width: '100%',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3
              }
            }}
          >
            <Box sx={{ 
              width: '100%',
              height: '250px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  backgroundColor: '#f5f5f5'
                }}
              />
            </Box>
            <CardContent sx={{ 
              flexGrow: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Box>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="h2"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    mb: 1,
                    height: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{
                    mb: 1,
                    height: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {product.description}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={product.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.rating})
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ 
                    mb: 1,
                    fontWeight: 'bold'
                  }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={product.category}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    label={product.inStock ? 'In Stock' : 'Out of Stock'}
                    color={product.inStock ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                sx={{
                  textTransform: 'none',
                  py: 1
                }}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Product added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Products; 