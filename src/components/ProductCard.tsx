import React from 'react';
import { Card, CardContent, CardMedia, Typography, Tooltip, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  width: '350px',
  height: '380px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const StyledDescription = styled(Typography)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onDelete }) => {
  const defaultImage = 'https://avatars.mds.yandex.net/i?id=8ad6a2e3c7eb24581a1119dd06e8ee7b_sr-4798081-images-thumbs&n=13';

  return (
    <Tooltip title={product.description}>
      <Box sx={{ position: 'relative' }}>
        <StyledCard onClick={onClick}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {product.category}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="200"
            image={product.image || defaultImage}
            alt={product.name}
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <StyledDescription variant="body2" color="text.secondary">
              {product.description}
            </StyledDescription>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {product.quantity} {product.unit} — {product.price}₽
            </Typography>
          </CardContent>
        </StyledCard>
        {onDelete && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(e);
            }}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255,255,255,0.8)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
            }}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Tooltip>
  );
};

export default ProductCard;
