import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
  Person,
  Search,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMobileMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          E-Shop
        </Typography>

        {!isMobile && (
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <SearchBar />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/products"
              >
                Products
              </Button>
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <Person />
              </IconButton>
            </>
          )}
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem
            onClick={() => {
              navigate('/login');
              handleProfileMenuClose();
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/register');
              handleProfileMenuClose();
            }}
          >
            Register
          </MenuItem>
        </Menu>

        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={handleMobileMenuToggle}
        >
          <List sx={{ width: 250 }}>
            <ListItem button component={Link} to="/products">
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
      {isMobile && (
        <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
          <SearchBar />
        </Box>
      )}
    </AppBar>
  );
};

export default Header; 