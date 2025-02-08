import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/productsSlice';
import { RootState } from '../store/store';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [category, setCategory] = useState('');
 
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState('');
  const [unit, setUnit] = useState('pcs');

  const handleSave = () => {
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);

    if (!name || !description || !quantity || !price || numericQuantity <= 0 || numericPrice <= 0) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    dispatch(
      addProduct({
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
   
    setName('');
    setDescription('');
    setCategory('');
    setQuantity('');
    setPrice('');
    setImage('');
    setUnit('pcs');
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
      <DialogTitle>Добавить товар</DialogTitle>
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

export default AddProductModal;
