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
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event._id}>
      <Card 
        sx={{ 
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        onClick={() => navigate(`/event/${event._id}`)}
      >
        {event.url ? (
          <CardMedia 
            sx={{ 
              height: 200,
              flexShrink: 0,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }} 
            image={event.url} 
          />
        ) : (
          <Box sx={{ 
            height: 200,
            flexShrink: 0,
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: 'rgba(0, 97, 255, 0.06)'
          }}>
            <Box sx={{ 
              backgroundColor: 'rgba(0, 97, 255, 0.1)',
              borderRadius: '50%',
              p: 2,
            }}>
              <CalendarTodayIcon sx={{ fontSize: 48, color: '#0061FF' }} />
            </Box>
          </Box>
        )}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="div">
            {event.name}
          </Typography>
          
          {event.date && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {event.date}{event.time ? ` at ${event.time}` : ''}
              </Typography>
            </Box>
          )}
          
          {event.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            </Box>
          )}

          {event.organizer && (
            <Chip 
              label={`By ${event.organizer}`}
              size="small"
              sx={{ mt: 1 }}
              variant="outlined"
            />
          )}

          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(event);
              setEditOpen(true);
            }}
            size="small"
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: '#1E1919',
              letterSpacing: '-0.02em',
            }}
          >
            Upcoming Events
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddOpen(true)}
          >
            Add Event
          </Button>
        </Box>

        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: '#637381',
            lineHeight: 1.7,
            mb: 4,
          }}
        >
          Join us for fun activities, adoption drives, and community gatherings. 
          Check out our upcoming events and mark your calendar!
        </Typography>

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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddOpen(true)}
              sx={{ mt: 2 }}
            >
              Create First Event
            </Button>
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

