import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import store, { RootState } from './store/store';
import AppBarNav from './components/AppBarNav';
import DrawerMenu from './components/DrawerMenu';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CategoriesPage from './pages/CategoriesPage';
import UserProfile from './pages/UserProfile';
import { lightTheme, darkTheme } from './theme';
import { setFilters } from './store/filtersSlice';

const AppContent: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  
  const categories = useSelector((state: RootState) => state.categories.map(cat => cat.name));
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  const handleApplyFilters = (newFilters: FiltersState) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBarNav
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(prev => !prev)}
        onMenuToggle={() => setDrawerOpen(true)}
      />
      {location.pathname === '/' && (
        <DrawerMenu
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          categories={categories}
          onApplyFilters={handleApplyFilters}
          currentFilters={filters}
        />
      )}
      <Box sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
