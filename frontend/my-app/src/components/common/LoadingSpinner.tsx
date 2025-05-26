import { Box, CircularProgress } from '@mui/material';

export const LoadingSpinner = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <CircularProgress />
    </Box>
  );
}; 