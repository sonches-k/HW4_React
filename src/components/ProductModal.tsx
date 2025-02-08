import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import { Product } from '../types';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => {
  if (!product) return null;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { width: '800px', height: '500px', maxWidth: 'none' }
      }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {product.name}
        </Typography>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Category:</strong> {product.category || 'N/A'}
        </Typography>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <img
            src={product.image || 'https://via.placeholder.com/200'}
            alt={product.name}
            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
          />
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Description:</strong> {product.description}
        </Typography>
        <Typography variant="body1">
          <strong>Quantity:</strong> {product.quantity} {product.unit}
        </Typography>
        <Typography variant="body1">
          <strong>Price:</strong> {product.price}₽
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
