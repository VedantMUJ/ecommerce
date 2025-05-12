import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            E-Shop
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/products"
              color="inherit"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            >
              Products
            </Button>

            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={0} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
                sx={{
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 