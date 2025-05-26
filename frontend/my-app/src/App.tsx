import { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  Box
} from '@mui/material';
import { SearchBar } from './components/SearchBar';
import { Header } from './components/layout/Header';
import { SearchResults } from './components/layout/SearchResults';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ErrorAlert } from './components/common/ErrorAlert';
import type { SearchResponse, Podcast } from './types/podcast';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      textAlign: 'center',
      marginBottom: '2rem',
    },
    fontFamily: [
      'Cairo',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App(): JSX.Element {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (results: SearchResponse) => {
    try {
      setLoading(true);
      setError(null);
      setSearchResults(results);
    } catch (err) {
      setError('حدث خطأ أثناء البحث عن البودكاست');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (podcast: Podcast) => {
    console.log('Subscribing to podcast:', podcast.collectionName);
    window.open(podcast.feedUrl, '_blank');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            pt: { xs: 8, sm: 9 },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ 
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              gap: 3
            }}>
              <SearchBar onSearch={handleSearch} />
              
              {loading && <LoadingSpinner />}
              {error && <ErrorAlert message={error} />}
              
              {searchResults && !loading && (
                <SearchResults 
                  results={searchResults}
                  onSubscribe={handleSubscribe}
                />
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
