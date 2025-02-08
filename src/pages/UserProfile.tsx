import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const UserProfile: React.FC = () => {
  const user = {
    name: "Кайгородова Соня",
    email: "iexample@mail.com",
    group: "Студент",
    avatar: "https://via.placeholder.com/100"
  };

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Avatar src={user.avatar} sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }} />
      <Typography variant="h5">{user.name}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Группа: {user.group}</Typography>
    </Box>
  );
};

export default UserProfile;