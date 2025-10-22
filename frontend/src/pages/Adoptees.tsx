import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getPets } from '../ExampleApi';
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
};

function Adoptees() {
  const location = useLocation();
  const [adoptedPets, setAdoptedPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAdoptedPets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getPets();
      const adopted = data.filter((pet: Pet) => pet.adopted);
      setAdoptedPets(adopted);
    } catch (e: any) {
      setError('Error loading adopted pets: ' + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdoptedPets();
  }, [location.key]); // location.key changes on every navigation, even to the same path

  const petCards = adoptedPets.map((pet: Pet) => (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pet._id}>
      <Card 
        sx={{ 
          height: 420,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        {pet.url ? (
          <CardMedia 
            sx={{ 
              height: 250,
              flexShrink: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} 
            image={pet.url} 
          />
        ) : (
          <Box sx={{ 
            height: 250,
            flexShrink: 0,
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: 'rgba(0, 200, 117, 0.06)'
          }}>
            <Box sx={{ 
              backgroundColor: 'rgba(0, 200, 117, 0.1)',
              borderRadius: '50%',
              p: 2,
            }}>
              <FavoriteIcon sx={{ fontSize: 48, color: '#00C875' }} />
            </Box>
          </Box>
        )}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 600,
              color: '#1E1919',
              fontSize: '1.125rem',
              mb: 0.5,
            }}
          >
            {pet.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#637381',
              mb: 1.5,
            }}
          >
            {pet.breed} • {pet.age} yrs
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 'auto' }}>
            {pet.species && (
              <Chip 
                label={pet.species} 
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(0, 97, 255, 0.08)',
                  color: '#0061FF',
                  fontWeight: 500,
                  border: 'none',
                }}
              />
            )}
            <Chip 
              label="Adopted" 
              size="small"
              sx={{ 
                backgroundColor: 'rgba(0, 200, 117, 0.08)',
                color: '#00C875',
                fontWeight: 500,
                border: 'none',
              }}
            />
          </Box>
        </CardContent>
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            p: 0.5
          }}
        >
          <FavoriteIcon sx={{ color: '#FF5252' }} />
        </Box>
      </Card>
    </Grid>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Box sx={{ 
        background: 'linear-gradient(135deg, #E8F8F5 0%, #D5F2EA 100%)',
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
            Our Success Stories
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
            Celebrating the wonderful pets who found their forever homes
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

        {!loading && !error && adoptedPets.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No adopted pets to display yet. Check back soon!
            </Typography>
          </Box>
        )}

        {!loading && !error && adoptedPets.length > 0 && (
          <>
            <Typography 
              variant="body1" 
              paragraph 
              align="center" 
              sx={{ 
                mb: 5,
                color: '#637381',
                lineHeight: 1.7,
                fontSize: '1.0625rem',
              }}
            >
              We're proud to have helped {adoptedPets.length} pet{adoptedPets.length !== 1 ? 's' : ''} find loving homes. 
              These wonderful animals are now part of amazing families!
            </Typography>
            <Grid container spacing={3}>
              {petCards}
            </Grid>
          </>
        )}
      </Container>

      <Footer />
    </Box>
  );
}

export default Adoptees;

