import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import '@fontsource/luckiest-guy';

interface AppBarNavProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onMenuToggle?: () => void; 
}

const AppBarNav: React.FC<AppBarNavProps> = ({ isDarkMode, onToggleTheme, onMenuToggle }) => {
  const location = useLocation();
  const isProductsPage = location.pathname === '/';

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ fontFamily: '"Luckiest Guy", cursive' }}>
        {isProductsPage && onMenuToggle && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuToggle}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, letterSpacing: 1.5, textTransform: 'uppercase' }}
        >
          Exotic
        </Typography>
        <Stack direction="row" spacing={2}>
          <Switch checked={isDarkMode} onChange={onToggleTheme} color="default" />
          <Typography variant="body2" color="inherit" sx={{ letterSpacing: 1 }}>
            {isDarkMode ? 'Dark' : 'Light'}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ ml: 3 }}>
          <Button color="inherit" component={Link} to="/">
            Товары
          </Button>
          <Button color="inherit" component={Link} to="/categories">
            Категории
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Профиль
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarNav;
