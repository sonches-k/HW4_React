import React from 'react';
import { Drawer } from '@mui/material';
import Filters from './Filters';
import { FiltersState } from '../types';

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  onApplyFilters: (filters: FiltersState) => void;
  currentFilters: FiltersState;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose, categories, onApplyFilters, currentFilters }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Filters
        categories={categories}
        onApply={onApplyFilters}
        currentFilters={currentFilters}
        onClose={onClose}
      />
    </Drawer>
  );
};

export default DrawerMenu;
