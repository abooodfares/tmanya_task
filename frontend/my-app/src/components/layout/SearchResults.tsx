import { Box, Typography, useTheme, useMediaQuery, Container } from '@mui/material';
import { PodcastCard } from '../podcastcart';
import type { SearchResponse, Podcast } from '../../types/podcast';

interface SearchResultsProps {
  results: SearchResponse;
  onSubscribe: (podcast: Podcast) => void;
}

export const SearchResults = ({ results, onSubscribe }: SearchResultsProps): JSX.Element => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up('lg'));

  const getGridColumns = () => {
    if (isLaptop) return 'repeat(2, 1fr)'; // لابتوب وما فوق
    return '1fr'; // جوال وأيباد
  };

  return (
    <Box sx={{ 
      mt: 4,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      width: '100%'
    }}>
      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: '1.5rem', 
          mb: 2,
          textAlign: 'center'
        }}
      >
        نتائج البحث ({results.resultCount})
      </Typography>
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          px: { xs: 0.5, sm: 2, md: 3 },
        }}
      >
        <Box sx={{ 
          display: 'grid',
          alignItems: 'stretch',
          gridTemplateColumns: getGridColumns(),
          gap: { xs: 2, sm: 2.5, md: 3 },
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: '600px',
            md: '900px',
            lg: '1100px'
          },
          margin: '0 auto',
          boxSizing: 'border-box',
          p: { xs: 1, sm: 2, md: 2 },
        }}>
          {results.results.map((podcast: Podcast) => (
            <Box 
              key={podcast.collectionId}
              sx={{
                width: '100%',
                maxWidth: '100%',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <PodcastCard
                podcast={podcast}
                onSubscribe={() => onSubscribe(podcast)}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}; 