import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton,
  CardActionArea,
  useTheme,
  useMediaQuery,
  Chip,
  Link,
  Stack,
  Tooltip
} from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LaunchIcon from '@mui/icons-material/Launch';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import type { Podcast } from '../types/podcast';

interface PodcastCardProps {
  podcast: Podcast;
  onSubscribe?: () => void;
}

export const PodcastCard = ({ 
  podcast, 
  onSubscribe
}: PodcastCardProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card 
      sx={{ 
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: isMobile ? 'auto' : 200,
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          boxShadow: theme.shadows[8],
          transform: 'translateY(-4px)',
          transition: 'all 0.3s ease-in-out'
        }
      }}
    >
      <CardActionArea 
        sx={{ 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flex: 1
        }}
      >
        <CardMedia
          component="img"
          image={podcast.artworkUrl600}
          alt={podcast.collectionName}
          sx={{
            width: isMobile ? '100%' : 200,
            height: isMobile ? 200 : '100%',
            objectFit: 'cover'
          }}
        />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          flex: 1,
          position: 'relative'
        }}>
          <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
            <Typography 
              component="div" 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {podcast.collectionName}
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              sx={{ 
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {podcast.artistName}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip 
                icon={<MusicNoteIcon />} 
                label={podcast.primaryGenreName}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip 
                icon={<CalendarTodayIcon />} 
                label={formatDate(podcast.releaseDate)}
                size="small"
                color="secondary"
                variant="outlined"
              />
              <Chip 
                icon={<HeadphonesIcon />} 
                label={`${podcast.trackCount} حلقة`}
                size="small"
                color="info"
                variant="outlined"
              />
            </Stack>

            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              alignItems: 'center',
              mt: 'auto'
            }}>
              <Tooltip title="الاشتراك في البودكاست">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubscribe?.();
                  }}
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    }
                  }}
                >
                  <RssFeedIcon />
                </IconButton>
              </Tooltip>

              <Link 
                href={podcast.collectionViewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                <LaunchIcon fontSize="small" />
                <Typography variant="body2">فتح في Apple Podcasts</Typography>
              </Link>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};
