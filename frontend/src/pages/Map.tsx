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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
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
  coordinates?: [number, number]; // [longitude, latitude]
};

function Map() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fix for Leaflet default markers
  useEffect(() => {
    console.log('Setting up Leaflet icons...');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
    console.log('Leaflet icons configured');
  }, []);

  // Function to convert location names to coordinates
  const getLocationCoordinates = (location: string): [number, number] => {
    const locationMap: { [key: string]: [number, number] } = {
      'Boston': [-71.0589, 42.3601],
      'Cambridge': [-71.1106, 42.3736],
      'Somerville': [-71.1000, 42.3876],
      'Newton': [-71.2092, 42.3370],
      'Brookline': [-71.1211, 42.3318],
      'Medford': [-71.1062, 42.4184],
      'Watertown': [-71.1828, 42.3706],
      'Arlington': [-71.1564, 42.4154],
      'Belmont': [-71.1785, 42.3958],
      'Waltham': [-71.2356, 42.3765],
      'Alaska': [-149.9003, 61.2181], // Anchorage, Alaska
      'Canada': [-75.6972, 45.4215], // Ottawa, Canada
      'Berk': [-71.0589, 42.3601], // Use Boston coordinates for fictional locations
      'Unknown': [-71.0589, 42.3601] // Default to Boston
    };
    return locationMap[location] || locationMap['Unknown'];
  };

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPets();
        // Filter out adopted pets and add coordinates
        const available = data.filter((pet: Pet) => !pet.adopted).map((pet: Pet) => ({
          ...pet,
          coordinates: getLocationCoordinates(pet.location || 'Unknown')
        }));
        console.log('Loaded pets:', available);
        console.log('First pet coordinates:', available[0]?.coordinates);
          console.log('First pet location:', available[0]?.location);
          console.log('all pet coords with names:', available.map((pet: Pet) => ({ name: pet.name, coordinates: pet.coordinates })));
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
          <Box sx={{ display: 'flex', gap: 3, height: '600px' }}>
            {/* Interactive Map */}
            <Box sx={{ flex: '2', minWidth: 0 }}>
              <Card sx={{ height: '100%', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                  <MapContainer
                    center={[45.0, -100.0]}
                    zoom={3}
                    style={{ height: '100%', width: '100%' }}
                    whenCreated={(map) => {
                      console.log('Map created successfully!', map);
                    }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Test marker */}
                    <Marker position={[42.3601, -71.0589]}>
                      <Popup>
                        <div>Test Marker - Boston</div>
                      </Popup>
                    </Marker>
                    {pets.map((pet) => (
                      <Marker
                        key={pet._id}
                        position={[pet.coordinates![1], pet.coordinates![0]]}
                      >
                        <Popup>
                          <Box sx={{ p: 1, minWidth: 200 }}>
                            <Typography variant="h6" gutterBottom>
                              {pet.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Breed:</strong> {pet.breed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Age:</strong> {pet.age} years
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Species:</strong> {pet.species || 'Unknown'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Location:</strong> {pet.location}
                            </Typography>
                          </Box>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </Card>
            </Box>

            {/* Location List */}
            <Box sx={{ flex: '1', minWidth: 300 }}>
              <Card sx={{ height: '100%', overflow: 'auto' }}>
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
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'action.hover' },
                          p: 1,
                          borderRadius: 1
                        }}
                        onClick={() => {
                          // Location clicked - could add map centering logic here
                        }}
                      >
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
                              cursor: 'pointer',
                              '&:hover': { bgcolor: 'action.hover' }
                            }}
                            onClick={() => {
                              // Pet clicked - could add map centering logic here
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
            </Box>
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}

export default Map;