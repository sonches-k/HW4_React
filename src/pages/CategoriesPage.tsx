import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import CategoryModal from '../components/CategoryModal';
import { deleteCategory } from '../store/categoriesSlice';
import { Product } from '../types';

const CategoriesPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories);
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingCategoryId(null);
    setEditingCategoryName('');
    setModalOpen(true);
  };

  const handleEdit = (id: number, name: string) => {
    setEditingCategoryId(id);
    setEditingCategoryName(name);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const used = products.some(p => p.category === categories.find(c => c.id === id)?.name);
    if (used) {
      alert('Невозможно удалить категорию, так как она используется в товарах.');
      return;
    }
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete));
    }
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Управление категориями
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd} sx={{ mb: 2 }}>
        Добавить категорию
      </Button>
      <List>
        {categories.map(cat => (
          <ListItem key={cat.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEdit(cat.id, cat.name)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(cat.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryId={editingCategoryId || undefined}
        initialName={editingCategoryName}
      />
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <Typography>Вы уверены, что хотите удалить эту категорию?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Отмена</Button>
          <Button color="error" onClick={confirmDelete}>Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesPage;