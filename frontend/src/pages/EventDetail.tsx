import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { getEvent } from '../ExampleApi';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

type Event = {
  _id: string;
  name: string;
  organizer?: string;
  location?: string;
  url?: string;
  description?: string;
  time?: string;
  date?: string;
};

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getEvent(id);
        if (data) {
          setEvent(data);
        } else {
          setError('Event not found');
        }
      } catch (e: any) {
        setError('Error loading event: ' + e);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Container sx={{ py: 8, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Container>
        <Footer />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Container sx={{ py: 8, flex: 1 }}>
          <Alert severity="error">{error || 'Event not found'}</Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/events')}
            sx={{ mt: 2 }}
          >
            Back to Events
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/events')}
          sx={{ mb: 3 }}
        >
          Back to Events
        </Button>

        {event.url && (
          <Box
            component="img"
            src={event.url}
            alt={event.name}
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: 3,
              maxHeight: 400,
              objectFit: 'cover',
              mb: 3
            }}
          />
        )}

        <Typography variant="h3" gutterBottom fontWeight="bold">
          {event.name}
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            {event.date && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Date & Time
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {event.date}{event.time ? ` at ${event.time}` : ''}
                  </Typography>
                </Box>
              </Box>
            )}

            {event.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {event.location}
                  </Typography>
                </Box>
              </Box>
            )}

            {event.organizer && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Organized by
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {event.organizer}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {event.description && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              About This Event
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
              {event.description}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ py: 1.5 }}
          onClick={() => alert('Registration feature would be implemented here!')}
        >
          Register for Event
        </Button>
      </Container>

      <Footer />
    </Box>
  );
}

export default EventDetail;

