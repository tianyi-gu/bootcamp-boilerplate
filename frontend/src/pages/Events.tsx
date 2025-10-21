import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../ExampleApi';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AddEventDialog from '../components/AddEventDialog';
import EditEventDialog from '../components/EditEventDialog';

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

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const refreshEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getEvents();
      setEvents(data || []);
    } catch (e: any) {
      setError('Error loading events: ' + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  const eventCards = events.map((event: Event) => (
    <Grid item xs={12} sm={6} md={4} key={event._id}>
      <Card 
        sx={{ 
          height: 420,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          }
        }}
        onClick={() => navigate(`/event/${event._id}`)}
      >
        {event.url ? (
          <CardMedia 
            sx={{ 
              height: 240,
              flexShrink: 0,
            }} 
            image={event.url} 
          />
        ) : (
          <Box sx={{ 
            height: 240,
            flexShrink: 0,
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: '#F8F9FA'
          }}>
            <Box sx={{ 
              backgroundColor: 'rgba(32, 178, 170, 0.1)',
              borderRadius: '50%',
              p: 3,
            }}>
              <CalendarTodayIcon sx={{ fontSize: 48, color: '#20B2AA' }} />
            </Box>
          </Box>
        )}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{
              fontWeight: 700,
              color: '#1E1919',
              mb: 2,
              fontSize: '1.25rem',
            }}
          >
            {event.name}
          </Typography>
          
          {event.date && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: '#20B2AA' }} />
              <Typography variant="body2" sx={{ color: '#637381', fontWeight: 500 }}>
                {event.date}{event.time ? ` at ${event.time}` : ''}
              </Typography>
            </Box>
          )}
          
          {event.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: '#20B2AA' }} />
              <Typography variant="body2" sx={{ color: '#637381' }}>
                {event.location}
              </Typography>
            </Box>
          )}

          {event.organizer && (
            <Chip 
              label={`By ${event.organizer}`}
              size="small"
              sx={{ 
                mt: 'auto',
                backgroundColor: 'rgba(32, 178, 170, 0.08)',
                color: '#20B2AA',
                fontWeight: 500,
                border: 'none',
              }}
            />
          )}

          <IconButton
            sx={{ 
              position: 'absolute', 
              top: 12, 
              right: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#FFFFFF',
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(event);
              setEditOpen(true);
            }}
            size="small"
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ py: 6, flex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              color: '#1E1919',
              mb: 2,
              letterSpacing: '-0.02em',
            }}
          >
            Upcoming Events
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#637381',
              mb: 4,
              fontWeight: 400,
            }}
          >
            Join us for fun activities, adoption drives, and community gatherings. 
            Check out our upcoming events and mark your calendar!
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddOpen(true)}
            sx={{
              backgroundColor: '#20B2AA',
              color: '#FFFFFF',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#1A9B96',
              },
            }}
          >
            Add Event
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && events.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No events scheduled yet
            </Typography>
          </Box>
        )}

        {!loading && !error && events.length > 0 && (
          <Grid container spacing={3}>
            {eventCards}
          </Grid>
        )}
      </Container>

      <Footer />

      <AddEventDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdded={refreshEvents}
      />

      <EditEventDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdated={refreshEvents}
        event={selectedEvent}
      />
    </Box>
  );
}

export default Events;

