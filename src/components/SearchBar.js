import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${query}`);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ 'aria-label': 'search products' }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Paper>
  );
};

export default SearchBar; 