import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';

const featuredCategories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
    description: 'Latest gadgets and electronics',
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Accessories']
  },
  {
    id: 2,
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
    description: 'Trendy fashion and accessories',
    subcategories: ['Men', 'Women', 'Accessories', 'Footwear']
  },
  {
    id: 3,
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80',
    description: 'Beautiful home decorations',
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Lighting']
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    description: 'Sports equipment and accessories',
    subcategories: ['Exercise', 'Outdoor', 'Sports Wear', 'Equipment']
  },
  {
    id: 5,
    name: 'Books & Media',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    description: 'Books, movies, and music',
    subcategories: ['Books', 'eBooks', 'Movies', 'Music']
  },
  {
    id: 6,
    name: 'Beauty & Health',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Beauty and healthcare products',
    subcategories: ['Skincare', 'Makeup', 'Healthcare', 'Fragrances']
  },
  {
    id: 7,
    name: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&q=80',
    description: 'Fun toys and games for all ages',
    subcategories: ['Action Figures', 'Board Games', 'Educational', 'Outdoor Toys']
  },
  {
    id: 8,
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    description: 'Elegant jewelry and watches',
    subcategories: ['Necklaces', 'Rings', 'Earrings', 'Watches']
  }
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 15,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Welcome to E-Shop
          </Typography>
          <Typography 
            variant="h5" 
            paragraph
            sx={{ 
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              mb: 4
            }}
          >
            Discover amazing products at unbeatable prices
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/products"
            sx={{ 
              mt: 2,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Featured Categories */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            mb: 6,
            fontWeight: 'bold'
          }}
        >
          Featured Categories
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 4
        }}>
          {featuredCategories.map((category) => (
            <Card 
              key={category.id}
              sx={{ 
                height: '100%',
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
                position: 'relative',
                width: '100%',
                paddingTop: '100%' // Creates a perfect square
              }}>
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.name}
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="h3"
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    mb: 1,
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {category.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    height: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {category.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  to={`/products?category=${category.name.toLowerCase()}`}
                  sx={{
                    background: 'linear-gradient(45deg, #2B3445 30%, #3B4559 90%)',
                    border: 0,
                    borderRadius: '25px',
                    boxShadow: '0 3px 5px 2px rgba(43, 52, 69, .3)',
                    color: 'white',
                    height: 48,
                    padding: '0 30px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #3B4559 30%, #2B3445 90%)',
                      transform: 'scale(1.02)',
                      boxShadow: '0 6px 10px 2px rgba(43, 52, 69, .3)',
                    },
                    '&:active': {
                      transform: 'scale(0.98)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  Browse Products
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      transition: 'transform 0.3s ease',
                      '& svg': {
                        fontSize: '1.2rem',
                        ml: 1
                      }
                    }}
                  >
                    →
                  </Box>
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 