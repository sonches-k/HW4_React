import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import productsData from '../data/products.json';

const initialState: Product[] = productsData as Product[];

interface AddProductPayload extends Omit<Product, 'id'> {}
interface UpdateProductPayload extends Product {}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action: PayloadAction<Product>) {
        state.push(action.payload);
      },
      prepare(newProduct: AddProductPayload) {
        const id = Date.now();
        return { payload: { id, ...newProduct } };
      }
    },
    updateProduct(state, action: PayloadAction<UpdateProductPayload>) {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      return state.filter(p => p.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;