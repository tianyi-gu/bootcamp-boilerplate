import './Dashboard.css';
import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Box,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  MenuItem,
  Grid,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { getPets } from '../ExampleApi';
import AddPetDialog from '../components/AddPetDialog';
import EditPetDialog from '../components/EditPetDialog';
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

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [sexFilter, setSexFilter] = useState('All');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const refreshPets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getPets();
      if (data) {
        setData(data);
      } else {
        setError('Failed to load pets');
      }
    } catch (e: any) {
      setError('Error: ' + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPets();
  }, []);

  // Get featured pet of the week
  const petOfTheWeek = useMemo(() => {
    return data.find(pet => pet.featuredPetOfWeek && !pet.adopted);
  }, [data]);

  // Filter available pets (not adopted)
  const availablePets = useMemo(() => {
    return data.filter(pet => !pet.adopted);
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return availablePets.filter((pet: Pet) => {
      const matchesSearch = !q || 
        pet.name?.toLowerCase().includes(q) || 
        pet.breed?.toLowerCase().includes(q) ||
        pet.description?.toLowerCase().includes(q);
      
      const matchesSpecies = speciesFilter === 'All' || pet.species === speciesFilter;
      const matchesLocation = locationFilter === 'All' || pet.location === locationFilter;
      const matchesSex = sexFilter === 'All' || pet.sex === sexFilter;

      return matchesSearch && matchesSpecies && matchesLocation && matchesSex;
    });
  }, [availablePets, query, speciesFilter, locationFilter, sexFilter]);

  // Get unique values for filters
  const locations = useMemo(() => {
    const locs = new Set(data.map(pet => pet.location).filter(Boolean));
    return ['All', ...Array.from(locs)];
  }, [data]);

  const petCards = filtered.map((pet: Pet) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={pet._id}>
      <Card 
        sx={{ 
          height: 420,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        onClick={() => navigate(`/pet/${pet._id}`)}
      >
        {pet.url ? (
          <CardMedia 
            sx={{ 
              height: 220,
              flexShrink: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }} 
            image={pet.url} 
          />
        ) : (
          <Box sx={{ 
            height: 220,
            flexShrink: 0,
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: '#F7F9FC'
          }}>
            <Typography variant="subtitle1" sx={{ color: '#637381' }}>
              No pet picture
            </Typography>
          </Box>
        )}
        <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 600,
              color: '#1E1919',
              fontSize: '1.125rem',
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {pet.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#637381',
              mb: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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
            {pet.location && (
              <Chip 
                label={pet.location} 
                size="small"
                sx={{ 
                  backgroundColor: '#F7F9FC',
                  color: '#637381',
                  fontWeight: 500,
                  border: 'none',
                }}
              />
            )}
          </Box>
        </CardContent>
        <IconButton
          sx={{ 
            position: 'absolute', 
            top: 12, 
            right: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPet(pet);
            setEditOpen(true);
          }}
          size="small"
        >
          <EditIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Card>
    </Grid>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      {/* Pet of the Week Banner - Dropbox Style */}
      {petOfTheWeek && (
        <Box sx={{ 
          bgcolor: 'linear-gradient(135deg, #F0F7FF 0%, #E3F2FF 100%)',
          background: 'linear-gradient(135deg, #F0F7FF 0%, #E3F2FF 100%)',
          py: 6,
          mb: 4,
        }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={5}>
                {petOfTheWeek.url ? (
                  <Box
                    component="img"
                    src={petOfTheWeek.url}
                    alt={petOfTheWeek.name}
                    sx={{ 
                      borderRadius: 3,
                      width: '100%',
                      height: 320,
                      objectFit: 'cover',
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(0, 97, 255, 0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0, 97, 255, 0.2)',
                      }
                    }}
                    onClick={() => navigate(`/pet/${petOfTheWeek._id}`)}
                  />
                ) : (
                  <Box sx={{ 
                    height: 320,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 97, 255, 0.15)',
                  }}>
                    <Typography variant="subtitle1" sx={{ color: '#637381' }}>
                      No picture available
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip
                    icon={<FavoriteIcon sx={{ fontSize: 18 }} />}
                    label="Pet of the Week"
                    sx={{
                      backgroundColor: '#FFFFFF',
                      color: '#E2445C',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      border: '1.5px solid #FFE5E9',
                      boxShadow: '0 2px 8px rgba(226, 68, 92, 0.1)',
                    }}
                  />
                </Box>
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: '#1E1919',
                    mb: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {petOfTheWeek.name}
                </Typography>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: '#637381',
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  {petOfTheWeek.breed} • {petOfTheWeek.age} years old
                </Typography>
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{ 
                    color: '#1E1919',
                    lineHeight: 1.7,
                    mb: 3,
                  }}
                >
                  {petOfTheWeek.description || 'A wonderful pet looking for a loving home!'}
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate(`/pet/${petOfTheWeek._id}`)}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                    fontWeight: 500,
                  }}
                >
                  Learn More About {petOfTheWeek.name}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 600, 
              color: '#1E1919',
              mb: 3,
              letterSpacing: '-0.02em',
            }}
          >
            Available Pets
          </Typography>
          
          {/* Filters - Dropbox Style */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3, 
            flexWrap: 'wrap',
            p: 3,
            backgroundColor: '#FFFFFF',
            borderRadius: 3,
            border: '1px solid #E7EBF0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          }}>
            <TextField
              size="small"
              placeholder="Search by name, breed, or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ minWidth: 300, flex: 1 }}
            />
            <TextField
              select
              size="small"
              label="Species"
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              sx={{ minWidth: 130 }}
            >
              <MenuItem value="All">All Species</MenuItem>
              <MenuItem value="Dog">Dogs</MenuItem>
              <MenuItem value="Cat">Cats</MenuItem>
              <MenuItem value="Bird">Birds</MenuItem>
              <MenuItem value="Rabbit">Rabbits</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              select
              size="small"
              label="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              {locations.map(loc => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label="Sex"
              value={sexFilter}
              onChange={(e) => setSexFilter(e.target.value)}
              sx={{ minWidth: 110 }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
              <Button 
                variant="outlined" 
                onClick={refreshPets}
              >
                Refresh
              </Button>
              <Button 
                variant="contained" 
                onClick={() => setAddOpen(true)}
              >
                Add Pet
              </Button>
            </Box>
          </Box>

          <Typography 
            variant="body2" 
            sx={{ 
              color: '#637381',
              fontWeight: 500,
            }}
          >
            Showing {filtered.length} of {availablePets.length} available pets
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <Grid container spacing={3}>
            {petCards}
          </Grid>
        )}

        {!loading && !error && filtered.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 12,
            px: 3,
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#1E1919',
                fontWeight: 600,
                mb: 1,
              }}
            >
              No pets match your filters
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#637381',
              }}
            >
              Try adjusting your search or filters to find more pets
            </Typography>
          </Box>
        )}
      </Container>

      <Footer />

      <AddPetDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdded={refreshPets}
      />

      <EditPetDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdated={refreshPets}
        pet={selectedPet}
      />
    </Box>
  );
}

export default Dashboard;

