import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              E-Shop
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your one-stop destination for quality products and exceptional shopping experience.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover">Home</Link>
              <Link href="#" color="text.secondary" underline="hover">Products</Link>
              <Link href="#" color="text.secondary" underline="hover">Categories</Link>
              <Link href="#" color="text.secondary" underline="hover">About Us</Link>
              <Link href="#" color="text.secondary" underline="hover">Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover">Help Center</Link>
              <Link href="#" color="text.secondary" underline="hover">Track Order</Link>
              <Link href="#" color="text.secondary" underline="hover">Returns</Link>
              <Link href="#" color="text.secondary" underline="hover">Shipping Info</Link>
              <Link href="#" color="text.secondary" underline="hover">FAQs</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              123 Business Street<br />
              City, State 12345<br />
              United States
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@eshop.com<br />
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} E-Shop. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="text.secondary" variant="body2" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" variant="body2" underline="hover">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 