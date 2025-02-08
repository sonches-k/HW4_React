import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import EditProductModal from '../components/EditProductModal';
import { deleteProduct } from '../store/productsSlice';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const product = useSelector((state: RootState) =>
    state.products.find(p => p.id === productId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);

  if (!product) {
    return (
      <Typography variant="h6" align="center">
        Товар не найден.
      </Typography>
    );
  }

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    navigate('/');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ maxWidth: 800, margin: '0 auto', mb: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Категория: {product.category || 'Не выбрана'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="body2">
            Количество: {product.quantity} {product.unit}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Цена: {product.price}₽
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditModalOpen(true)}
        >
          Редактировать товар
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Удалить товар
        </Button>
      </Box>
      <EditProductModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={product}
      />
    </Box>
  );
};

export default ProductDetailsPage;
