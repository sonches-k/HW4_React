import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../store/productsSlice';
import { RootState } from '../store/store';
import { Product } from '../types';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [quantity, setQuantity] = useState<string>(
    product.quantity && product.quantity > 0 ? String(product.quantity) : ''
  );
  const [price, setPrice] = useState<string>(
    product.price && product.price > 0 ? String(product.price) : ''
  );
  const [image, setImage] = useState(product.image);
  const [unit, setUnit] = useState(product.unit);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setQuantity(product.quantity && product.quantity > 0 ? String(product.quantity) : '');
    setPrice(product.price && product.price > 0 ? String(product.price) : '');
    setImage(product.image);
    setUnit(product.unit);
  }, [product]);

  const handleSave = () => {
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);

    if (!name || !description || numericQuantity <= 0 || numericPrice <= 0) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    dispatch(
      updateProduct({
        id: product.id,
        name,
        description,
        category,
        quantity: numericQuantity,
        price: numericPrice,
        image,
        unit,
      })
    );
    onClose();
  };

  const noSpinStyles = {
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактировать товар</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={3}
          />
          <TextField
            label="Категория"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>Не выбрана</em>
            </MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Количество"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            InputProps={{
              inputProps: { inputMode: 'numeric', pattern: '[0-9]*' },
            }}
            sx={noSpinStyles}
          />
          <TextField
            label="Цена"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            InputProps={{
              inputProps: { inputMode: 'numeric', pattern: '[0-9]*' },
            }}
            sx={noSpinStyles}
          />
          <TextField
            label="Ссылка на изображение"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            label="Единица измерения"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" onClick={handleSave}>
              Сохранить
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Отмена
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
