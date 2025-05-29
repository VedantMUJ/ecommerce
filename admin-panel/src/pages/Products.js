import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { THEME_CONFIG } from '../config';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  transition: all 0.3s ease;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0;
`;

const AddButton = styled(motion.button)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  color: ${THEME_CONFIG.light.buttonText};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};

  &:hover {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.hover : THEME_CONFIG.light.hover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme === 'dark' ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.1)'};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0 0 0.5rem 0;
`;

const ProductPrice = styled.p`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  font-weight: bold;
  margin: 0.5rem 0;
`;

const ProductDescription = styled.p`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  margin: 0.5rem 0;
  opacity: 0.8;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  color: ${THEME_CONFIG.light.buttonText};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};

  &:hover {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.hover : THEME_CONFIG.light.hover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  border-radius: 4px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  border-radius: 4px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  }
`;

const API_URL = 'http://localhost:5000/api/admin';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    stock: '100',
    featured: false
  });
  const { theme } = useTheme();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct 
        ? `${API_URL}/products/${editingProduct._id}`
        : `${API_URL}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      // Ensure price is always a valid string
      const price = formData.price === undefined || formData.price === null ? '0' : String(formData.price);
      
      // Format the data before sending
      const formattedData = {
        name: formData.name || '',
        description: formData.description || '',
        image: formData.image || '',
        category: formData.category || '',
        price: price,
        stock: 100,
        featured: Boolean(formData.featured)
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save product');
      }

      const savedProduct = await response.json();
      
      if (editingProduct) {
        setProducts(products.map(p => 
          p._id === savedProduct._id ? savedProduct : p
        ));
      } else {
        setProducts([savedProduct, ...products]);
      }
      
      // Reset form and close modal
      setIsModalOpen(false);
      setFormData({
        name: '',
        description: '',
        price: '0',
        category: '',
        image: '',
        stock: '100',
        featured: false
      });
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.message || 'Failed to save product. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${API_URL}/products/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price ? String(product.price) : '0', // Ensure price is a string
      description: product.description || '',
      image: product.image || '',
      category: product.category || '',
      stock: '100',
      featured: Boolean(product.featured)
    });
    setIsModalOpen(true);
  };

  return (
    <Container theme={theme}>
      <MainContent>
        <Header>
          <Title theme={theme}>Products Management</Title>
          <AddButton
            theme={theme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingProduct(null);
              setFormData({ name: '', price: '', description: '', image: '', category: '', stock: '100', featured: false });
              setIsModalOpen(true);
            }}
          >
            <FaPlus /> Add Product
          </AddButton>
        </Header>

        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              theme={theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductImage src={product.image} alt={product.name} />
              <ProductName theme={theme}>{product.name}</ProductName>
              <ProductPrice theme={theme}>${product.price}</ProductPrice>
              <ProductDescription theme={theme}>{product.description}</ProductDescription>
              <ProductActions>
                <ActionButton
                  theme={theme}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit />
                </ActionButton>
                <ActionButton
                  theme={theme}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(product._id)}
                >
                  <FaTrash />
                </ActionButton>
              </ProductActions>
            </ProductCard>
          ))}
        </ProductGrid>

        {isModalOpen && (
          <Modal
            theme={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <ModalContent
              theme={theme}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label theme={theme}>Product Name</Label>
                  <Input
                    theme={theme}
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>Price</Label>
                  <Input
                    theme={theme}
                    type="text"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>Category</Label>
                  <Input
                    theme={theme}
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>Description</Label>
                  <TextArea
                    theme={theme}
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>Image URL</Label>
                  <Input
                    theme={theme}
                    type="url"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>
                    <Input
                      theme={theme}
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    Featured Product
                  </Label>
                </FormGroup>
                <AddButton theme={theme} type="submit">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </AddButton>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </Container>
  );
};

export default Products; 