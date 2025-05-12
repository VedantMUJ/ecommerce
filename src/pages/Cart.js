import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart is Empty
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Looks like you haven't added anything to your cart yet.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/products"
      >
        Continue Shopping
      </Button>
    </Container>
  );
};

export default Cart; 