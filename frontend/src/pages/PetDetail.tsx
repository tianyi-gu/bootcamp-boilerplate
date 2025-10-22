import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getPet } from '../ExampleApi';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

type Pet = {
  _id: string;
  name: string;
  breed: string;
  age: string;
  species?: string;
  url?: string;
  description?: string;
  location?: string;
  sex?: string;
  adopted?: boolean;
  featuredPetOfWeek?: boolean;
};

function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPet = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPet(id);
        if (data) {
          setPet(data);
        } else {
          setError('Pet not found');
        }
      } catch (e: any) {
        setError('Error loading pet: ' + e);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPet();
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

  if (error || !pet) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Container sx={{ py: 8, flex: 1 }}>
          <Alert severity="error">{error || 'Pet not found'}</Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Back to Dashboard
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Back to Dashboard
        </Button>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            {pet.url ? (
              <Box
                component="img"
                src={pet.url}
                alt={pet.name}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                  maxHeight: 500,
                  objectFit: 'cover'
                }}
              />
            ) : (
              <Box sx={{
                width: '100%',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f3f4f6',
                borderRadius: 2,
                boxShadow: 3
              }}>
                <Typography variant="h6" color="text.secondary">
                  No picture available
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {pet.featuredPetOfWeek && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FavoriteIcon sx={{ color: '#FF5252', mr: 1 }} />
                  <Typography variant="overline" color="error" fontWeight="bold">
                    Pet of the Week
                  </Typography>
                </Box>
              )}

              <Typography variant="h3" gutterBottom fontWeight="bold">
                {pet.name}
              </Typography>

              <Box sx={{ mb: 3 }}>
                {pet.species && (
                  <Chip 
                    label={pet.species} 
                    color="primary" 
                    sx={{ mr: 1, mb: 1 }} 
                  />
                )}
                {pet.sex && (
                  <Chip 
                    label={pet.sex === 'M' ? 'Male' : 'Female'} 
                    variant="outlined"
                    sx={{ mr: 1, mb: 1 }} 
                  />
                )}
                {pet.adopted && (
                  <Chip 
                    label="Adopted" 
                    color="success"
                    sx={{ mr: 1, mb: 1 }} 
                  />
                )}
              </Box>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Breed
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {pet.breed}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Age
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {pet.age} years old
                      </Typography>
                    </Grid>
                    {pet.location && (
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body2" color="text.secondary">
                          Location
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOnIcon sx={{ fontSize: 20, mr: 0.5 }} />
                          <Typography variant="body1" fontWeight="medium">
                            {pet.location}
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>

              {pet.description && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    About {pet.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {pet.description}
                  </Typography>
                </Box>
              )}

              {!pet.adopted && (
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.5 }}
                  onClick={() => alert('Adoption process would begin here!')}
                >
                  Adopt {pet.name}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

export default PetDetail;

