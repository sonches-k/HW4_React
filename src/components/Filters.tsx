import React, { useState, useEffect } from 'react';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Button,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FiltersState } from '../types';

interface FiltersProps {
  categories: string[];
  onApply: (filters: FiltersState) => void;
  currentFilters: FiltersState;
  onClose: () => void;
}

const Filters: React.FC<FiltersProps> = ({ categories, onApply, currentFilters, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [nonZeroQuantity, setNonZeroQuantity] = useState(false);

  useEffect(() => {
    if (currentFilters) {
      setName(currentFilters.nameRegex ? currentFilters.nameRegex.source.replace(/\\i/g, '') : '');
      setCategory(currentFilters.category);
      setNonZeroQuantity(currentFilters.nonZeroQuantity);
    }
  }, [currentFilters]);

  const handleApply = () => {
    const nameRegex = name ? new RegExp(name.toLowerCase(), 'i') : null;
    onApply({ nameRegex, category, nonZeroQuantity });
    onClose();
  };

  const handleResetAll = () => {
    setName('');
    setCategory(null);
    setNonZeroQuantity(false);
    onApply({ nameRegex: null, category: null, nonZeroQuantity: false });
    onClose();
  };

  return (
    <Stack spacing={2} sx={{ p: 2, width: '250px' }}>
      <Typography variant="h6">Filters</Typography>
      <TextField
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          endAdornment: name && (
            <InputAdornment position="end">
              <IconButton onClick={() => setName('')}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={nonZeroQuantity}
            onChange={(e) => setNonZeroQuantity(e.target.checked)}
          />
        }
        label="Only Non-Zero Quantity"
      />
      <Autocomplete
        options={categories}
        value={category}
        onChange={(e, newVal) => setCategory(newVal)}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <Stack direction="row" spacing={1}>
        <Button onClick={handleApply} variant="contained" color="secondary">
          Apply
        </Button>
        <Button onClick={handleResetAll} color="secondary" variant="outlined">
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};

export default Filters;
