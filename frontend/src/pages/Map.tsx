import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PetsIcon from '@mui/icons-material/Pets';
import { getPets } from '../ExampleApi';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

type Pet = {
  _id: string;
  name: string;
  breed: string;
  age: string;
  species?: string;
  location?: string;
  adopted?: boolean;
};

function Map() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPets();
        // Filter out adopted pets
        const available = data.filter((pet: Pet) => !pet.adopted);
        setPets(available);
      } catch (e: any) {
        setError('Error loading pets: ' + e);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  // Group pets by location
  const petsByLocation = pets.reduce((acc: any, pet) => {
    const location = pet.location || 'Unknown';
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(pet);
    return acc;
  }, {});

  const locations = Object.keys(petsByLocation).sort();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Box sx={{ 
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        py: 6, 
        mb: 5,
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 600,
              color: '#1E1919',
              letterSpacing: '-0.02em',
              mb: 2,
            }}
          >
            Pet Locations
          </Typography>
          <Typography 
            variant="h6" 
            align="center"
            sx={{ 
              color: '#637381',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Find pets available for adoption near you
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && pets.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No pets available at the moment
            </Typography>
          </Box>
        )}

        {!loading && !error && pets.length > 0 && (
          <Grid container spacing={3}>
            {/* Map Placeholder */}
            <Grid item xs={12} md={8}>
              <Card sx={{ height: 500 }}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #F7F9FC 0%, #EFF3F8 100%)',
                    p: 5,
                    textAlign: 'center'
                  }}
                >
                  <Box sx={{ 
                    backgroundColor: 'rgba(0, 97, 255, 0.1)',
                    borderRadius: '50%',
                    p: 3,
                    mb: 3,
                  }}>
                    <LocationOnIcon sx={{ fontSize: 64, color: '#0061FF' }} />
                  </Box>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: '#1E1919',
                      mb: 1.5,
                    }}
                  >
                    Interactive Map Coming Soon!
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#637381',
                      lineHeight: 1.7,
                      maxWidth: 450,
                      mb: 2,
                    }}
                  >
                    We're working on integrating an interactive map to help you find pets near you. 
                    For now, please check the location list on the right.
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#637381',
                      fontStyle: 'italic',
                    }}
                  >
                    Integration Suggestion: Google Maps API or Mapbox
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Location List */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Pets by Location
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  
                  {locations.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No locations available
                    </Typography>
                  )}

                  {locations.map((location, idx) => (
                    <Box key={location} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle1" fontWeight="medium">
                          {location}
                        </Typography>
                        <Chip 
                          label={petsByLocation[location].length}
                          size="small"
                          color="primary"
                          sx={{ ml: 'auto' }}
                        />
                      </Box>
                      <List dense disablePadding>
                        {petsByLocation[location].map((pet: Pet) => (
                          <ListItem 
                            key={pet._id}
                            sx={{ 
                              pl: 4,
                              '&:hover': { bgcolor: 'action.hover' }
                            }}
                          >
                            <PetsIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <ListItemText
                              primary={pet.name}
                              secondary={`${pet.species || 'Pet'} • ${pet.age} yrs`}
                              primaryTypographyProps={{ variant: 'body2' }}
                              secondaryTypographyProps={{ variant: 'caption' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      {idx < locations.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      <Footer />
    </Box>
  );
}

export default Map;

