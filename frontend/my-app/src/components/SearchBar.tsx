import { useState } from 'react';
import { 
  TextField, 
  IconButton, 
  InputAdornment, 
  Box,
  useTheme,
  useMediaQuery,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchPodcasts } from '../utils/api';
import type { SearchResponse } from '../types/podcast';

interface SearchBarProps {
  onSearch: (results: SearchResponse) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('الرجاء إدخال كلمة بحث');
      return;
    }
    
    try {
      setError(null);
      setIsLoading(true);
      const results = await fetchPodcasts(searchTerm);
      onSearch(results);
    } catch (error) {
      console.error('Search failed:', error);
      setError('حدث خطأ أثناء البحث. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 24px',
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="ابحث عن بودكاست..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setError(null);
        }}
        error={!!error}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                edge="end"
                disabled={isLoading}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'action.disabledBackground',
                    color: 'action.disabled',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '28px',
            backgroundColor: 'background.paper',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            },
          },
        }}
      />
    </Box>
  );
};
