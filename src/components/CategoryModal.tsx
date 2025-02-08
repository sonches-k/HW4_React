import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../store/categoriesSlice';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  categoryId?: number; 
  initialName?: string;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, onClose, categoryId, initialName = '' }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSave = () => {
    if (!name) {
      alert('Название категории обязательно.');
      return;
    }
    if (categoryId) {
      dispatch(updateCategory({ id: categoryId, name }));
    } else {
      dispatch(addCategory({ name }));
    }
    onClose();
    setName('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{categoryId ? 'Редактировать категорию' : 'Добавить категорию'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Название категории" value={name} onChange={(e) => setName(e.target.value)} required />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" onClick={handleSave}>Сохранить</Button>
            <Button variant="outlined" onClick={onClose}>Отмена</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
