import { configureStore, Middleware } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import categoriesReducer from './categoriesSlice';
import filtersReducer from './filtersSlice';

const loggerMiddleware: Middleware = storeAPI => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', storeAPI.getState());
  return result;
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    filters: filtersReducer,
  },
  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
