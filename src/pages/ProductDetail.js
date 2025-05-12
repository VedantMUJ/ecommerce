import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Mock product data (replace with actual API call)
  const product = {
    id: parseInt(id),
    name: "Product Detail",
    price: 99.99,
    image: "https://source.unsplash.com/800x600/?product",
    description: "Detailed product description goes here."
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 