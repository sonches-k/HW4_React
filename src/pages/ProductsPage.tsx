import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Button } from '@mui/material';
import AddProductModal from '../components/AddProductModal';
import InfiniteProductList from '../components/InfiniteProductList';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../store/productsSlice';

const ProductsPage: React.FC = () => {
  const allProducts = useSelector((state: RootState) => state.products);
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addModalOpen, setAddModalOpen] = useState(false);

  const filteredProducts = allProducts.filter(product => {
    if (filters.nameRegex && !filters.nameRegex.test(product.name)) return false;
    if (filters.category && product.category !== filters.category) return false;
    if (filters.nonZeroQuantity && product.quantity === 0) return false;
    return true;
  });

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleProductDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)} sx={{ mb: 2 }}>
        Добавить товар
      </Button>
      <InfiniteProductList
        products={filteredProducts}
        onProductClick={handleProductClick}
        onDeleteProduct={handleProductDelete}
      />
      <AddProductModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </Box>
  );
};

export default ProductsPage;
