import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = (): JSX.Element => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          بحث البودكاست
        </Typography>
      </Toolbar>
    </AppBar>
  );
}; 