import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types';

const initialState: Category[] = [
  { id: 1, name: "S tier" },
  { id: 2, name: "C tier" },
  { id: 3, name: "A tier" },
  { id: 4, name: "B tier" },
  { id: 5, name: "D tier" }
];

interface AddCategoryPayload {
  name: string;
}
interface UpdateCategoryPayload {
  id: number;
  name: string;
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: {
      reducer(state, action: PayloadAction<Category>) {
        state.push(action.payload);
      },
      prepare(newCategory: AddCategoryPayload) {
        const id = Date.now();
        return { payload: { id, name: newCategory.name } };
      }
    },
    updateCategory(state, action: PayloadAction<UpdateCategoryPayload>) {
      const category = state.find(c => c.id === action.payload.id);
      if (category) {
        category.name = action.payload.name;
      }
    },
    deleteCategory(state, action: PayloadAction<number>) {
      return state.filter(c => c.id !== action.payload);
    }
  }
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;