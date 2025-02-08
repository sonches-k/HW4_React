import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '../types';

const initialState: FiltersState = {
  nameRegex: null,
  category: null,
  nonZeroQuantity: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.nameRegex = action.payload ? new RegExp(action.payload, 'i') : null;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setNonZeroQuantity: (state, action: PayloadAction<boolean>) => {
      state.nonZeroQuantity = action.payload;
    },
    setFilters: (state, action: PayloadAction<FiltersState>) => action.payload,
  },
});

export const { setNameFilter, setCategory, setNonZeroQuantity, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
