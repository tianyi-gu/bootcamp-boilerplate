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
  Modal,
  Backdrop,
  Fade,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';
import { getPets, updatePet } from '../ExampleApi';
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
  // const navigate = useNavigate();
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
  const [petModalOpen, setPetModalOpen] = useState(false);

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

  const clearFilters = () => {
    setQuery('');
    setSpeciesFilter('All');
    setLocationFilter('All');
    setSexFilter('All');
  };

  useEffect(() => {
    refreshPets();
  }, []);

  // Get featured pet of the week
  // const petOfTheWeek = useMemo(() => {
  //   return data.find(pet => pet.featuredPetOfWeek && !pet.adopted);
  // }, [data]);

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
        pet.description?.toLowerCase().includes(q) ||
        pet.species?.toLowerCase().includes(q) ||
        pet.location?.toLowerCase().includes(q) ||
        pet.age?.toLowerCase().includes(q) ||
        (pet.sex?.toUpperCase() === 'M' && 'male'.includes(q)) ||
        (pet.sex?.toUpperCase() === 'F' && 'female'.includes(q));
      
      const matchesSpecies = speciesFilter === 'All' || pet.species?.toLowerCase() === speciesFilter.toLowerCase();
      const matchesLocation = locationFilter === 'All' || pet.location === locationFilter;
      const matchesSex = sexFilter === 'All' || pet.sex?.toUpperCase() === sexFilter.toUpperCase();

      return matchesSearch && matchesSpecies && matchesLocation && matchesSex;
    });
  }, [availablePets, query, speciesFilter, locationFilter, sexFilter]);

  // Get unique values for filters
  const locations = useMemo(() => {
    const locs = new Set(data.map(pet => pet.location).filter(Boolean));
    return ['All', ...Array.from(locs)];
  }, [data]);

  const petCards = filtered.map((pet: Pet) => (
    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} key={pet._id}>
      <Card 
        sx={{ 
          height: 320,
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: 4,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), 0 4px 10px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(32, 178, 170, 0.3)',
          }
        }}
        onClick={() => {
          setSelectedPet(pet);
          setPetModalOpen(true);
        }}
      >
        {pet.url ? (
          <CardMedia 
            sx={{ 
              height: 200,
              flexShrink: 0,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} 
            image={pet.url} 
          />
        ) : (
          <Box sx={{ 
            height: 200,
            flexShrink: 0,
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: '#F8F9FA'
          }}>
            <Typography variant="subtitle1" sx={{ color: '#637381' }}>
              No pet picture
            </Typography>
          </Box>
        )}
        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              color: '#1E1919',
              fontSize: '1.2rem',
              mb: 1,
              textTransform: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            {pet.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              color: '#6B7280',
              mb: 0.5,
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          >
            {pet.breed}
          </Typography>
          <Typography 
            variant="body2" 
                sx={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              color: '#6B7280',
              mb: 2,
              fontSize: '0.85rem',
              fontWeight: 400,
            }}
          >
            {pet.sex === 'M' ? 'Male' : 'Female'}, {pet.age} yrs
          </Typography>
            {pet.location && (
            <Typography 
              variant="body2" 
                sx={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                color: '#9CA3AF',
                fontSize: '0.8rem',
                mt: 'auto',
                fontWeight: 400,
              }}
            >
              📍 {pet.location}
            </Typography>
          )}
        </CardContent>
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
            e.preventDefault();
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
      
      {/* Organization Banner */}
        <Box sx={{ 
        background: 'linear-gradient(135deg, #20B2AA 0%, #17A2B8 50%, #138496 100%)',
        py: 8,
        mb: 6,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative Elements */}
        <Box sx={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          opacity: 0.3,
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          opacity: 0.4,
        }} />
        
        {/* Pet Paw Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff"%3E%3Cpath d="M40 20c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/%3E%3Cpath d="M25 35c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm30 0c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/%3E%3Cpath d="M35 50c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm10 0c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/%3E%3C/g%3E%3C/svg%3E")',
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', color: '#FFFFFF' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 700,
                mb: 3,
                letterSpacing: '-0.02em',
                fontSize: { xs: '2.4rem', md: '3.6rem' },
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                lineHeight: 1.1,
              }}
            >
              Pawgrammers Pet Adoption
            </Typography>
            <Typography 
              variant="h5" 
                    sx={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                mb: 4,
                opacity: 0.9,
                maxWidth: '680px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                letterSpacing: '0.01em',
              }}
            >
              Connecting loving families with pets in need. 
              Making every adoption a success story.
            </Typography>
            
            {/* Stats Row */}
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
              gap: { xs: 4, md: 8 }, 
              flexWrap: 'wrap',
              mt: 6,
            }}>
              <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 700, 
                    mb: 1,
                    fontSize: { xs: '3.2rem', md: '4.2rem' },
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  {availablePets.length}
                    </Typography>
                <Typography 
                  variant="h6" 
                    sx={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 500,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    letterSpacing: '0.01em',
                    color: '#FFFFFF',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  Pets Available
                </Typography>
                </Box>
              <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 700, 
                    mb: 1,
                    fontSize: { xs: '3.2rem', md: '4.2rem' },
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  {data.filter(pet => pet.adopted).length}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 500,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    letterSpacing: '0.01em',
                    color: '#FFFFFF',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  Successfully Adopted
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 700, 
                    mb: 1,
                    fontSize: { xs: '3.2rem', md: '4.2rem' },
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  {data.length}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 500,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    letterSpacing: '0.01em',
                    color: '#FFFFFF',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  Total Pets
                </Typography>
              </Box>
            </Box>
          </Box>
          </Container>
        </Box>

      {/* Main Content with Sidebar Layout */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left Sidebar - Filters */}
        <Box sx={{ 
          width: { xs: '100%', md: '320px' },
          minWidth: { md: '320px' },
          background: 'linear-gradient(180deg, #F8F9FA 0%, #F1F3F4 100%)',
          borderRight: { md: '1px solid #E5E7EB' },
          p: 3,
          overflowY: 'auto',
          display: { xs: 'none', md: 'block' },
          boxShadow: { md: '2px 0 8px rgba(0, 0, 0, 0.04)' }
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600, 
              color: '#1F2937',
              mb: 3,
              fontSize: '1.1rem',
            }}
          >
            Find Your Perfect Pet
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search pets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 3px rgba(32, 178, 170, 0.1)',
                  }
                }
              }}
            />
          </Box>

          {/* Filter Categories */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Species Filter */}
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: '#374151',
                  mb: 1,
                  fontSize: '0.9rem',
                }}
              >
                SPECIES
              </Typography>
            <TextField
              select
                fullWidth
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 3px rgba(32, 178, 170, 0.1)',
                    }
                  }
                }}
              >
                <MenuItem value="All">Any</MenuItem>
              <MenuItem value="Dog">Dogs</MenuItem>
              <MenuItem value="Cat">Cats</MenuItem>
              <MenuItem value="Bird">Birds</MenuItem>
              <MenuItem value="Rabbit">Rabbits</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            </Box>

            {/* Gender Filter */}
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: '#374151',
                  mb: 1,
                  fontSize: '0.9rem',
                }}
              >
                GENDER
              </Typography>
              <TextField
                select
                fullWidth
                value={sexFilter}
                onChange={(e) => setSexFilter(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 3px rgba(32, 178, 170, 0.1)',
                    }
                  }
                }}
              >
                <MenuItem value="All">Any</MenuItem>
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </TextField>
            </Box>

            {/* Location Filter */}
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: '#374151',
                  mb: 1,
                  fontSize: '0.9rem',
                }}
              >
                LOCATION
              </Typography>
            <TextField
              select
                fullWidth
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 3px rgba(32, 178, 170, 0.1)',
                    }
                  }
                }}
            >
              {locations.map(loc => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </TextField>
            </Box>

            {/* Admin Controls */}
            <Box sx={{ 
              mt: 4, 
              pt: 3, 
              borderTop: '1px solid #E5E7EB',
              background: 'linear-gradient(135deg, rgba(32, 178, 170, 0.05) 0%, rgba(23, 162, 184, 0.05) 100%)',
              borderRadius: 2,
              p: 2,
              mx: -1
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                variant="outlined" 
                  onClick={clearFilters}
                  sx={{ 
                    borderRadius: 2,
                    borderColor: '#20B2AA',
                    color: '#20B2AA',
                    '&:hover': {
                      borderColor: '#1A9B96',
                      backgroundColor: 'rgba(32, 178, 170, 0.04)',
                    }
                  }}
                >
                  Clear Filters
              </Button>
              <Button 
                variant="contained" 
                onClick={() => setAddOpen(true)}
                  sx={{ 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #20B2AA 0%, #17A2B8 100%)',
                    boxShadow: '0 2px 8px rgba(32, 178, 170, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1A9B96 0%, #138496 100%)',
                      boxShadow: '0 4px 12px rgba(32, 178, 170, 0.4)',
                    }
                  }}
              >
                Add Pet
              </Button>
              </Box>
            </Box>
            </Box>
          </Box>

        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1, 
          p: 3, 
          overflowY: 'auto',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)',
          minHeight: '100vh'
        }}>
          <Box sx={{ 
            mb: 4,
            p: 3,
            backgroundColor: '#FFFFFF',
            borderRadius: 3,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.06)'
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 700, 
                color: '#111827',
                mb: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Available Pets
            </Typography>
          <Typography 
              variant="body1" 
            sx={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                color: '#6B7280',
                mb: 0,
                fontWeight: 400,
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
            <Grid container spacing={3} justifyContent="center">
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
        </Box>
      </Box>

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

      {/* Full-Screen Pet Modal */}
      <Modal
        open={petModalOpen}
        onClose={() => setPetModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={petModalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
            onClick={() => setPetModalOpen(false)}
          >
            <Paper
              sx={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: { xs: '100%', md: '800px' },
                height: { xs: '100%', md: 'auto' },
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                  },
                }}
                onClick={() => setPetModalOpen(false)}
              >
                <CloseIcon />
              </IconButton>

              {selectedPet && (
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
                  {/* Pet Image */}
                  <Box sx={{ 
                    width: { xs: '100%', md: '50%' },
                    height: { xs: '300px', md: 'auto' },
                    minHeight: '400px',
                    position: 'relative',
                  }}>
                    {selectedPet.url ? (
                      <Box
                        component="img"
                        src={selectedPet.url}
                        alt={selectedPet.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F8F9FA',
                      }}>
                        <Typography variant="h6" sx={{ color: '#637381' }}>
                          No pet picture
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Pet Details */}
                  <Box sx={{ 
                    width: { xs: '100%', md: '50%' },
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 700,
                        color: '#1E1919',
                        mb: 2,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {selectedPet.name}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          color: '#6B7280',
                          mb: 1,
                          fontWeight: 500,
                        }}
                      >
                        {selectedPet.breed}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          color: '#6B7280',
                          mb: 1,
                        }}
                      >
                        {selectedPet.sex === 'M' ? 'Male' : 'Female'}, {selectedPet.age} years old
                      </Typography>
                      {selectedPet.location && (
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            color: '#6B7280',
                            mb: 2,
                          }}
                        >
                          📍 {selectedPet.location}
                        </Typography>
                      )}
                    </Box>

                    {/* Description */}
                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 600,
                          color: '#1E1919',
                          mb: 2,
                        }}
                      >
                        About {selectedPet.name}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          color: '#374151',
                          lineHeight: 1.6,
                          fontSize: '1.1rem',
                        }}
                      >
                        {selectedPet.description || 'No description available for this pet.'}
                      </Typography>
                    </Box>

                    {/* Action Buttons */}
                    {!selectedPet.adopted && (
                      <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#20B2AA',
                            color: '#FFFFFF',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            '&:hover': {
                              backgroundColor: '#1A9B96',
                            },
                          }}
                          onClick={async () => {
                            if (window.confirm(`Are you sure you want to adopt ${selectedPet.name}? This will mark them as adopted.`)) {
                              try {
                                await updatePet(selectedPet._id, { ...selectedPet, adopted: true });
                                alert(`Congratulations! ${selectedPet.name} has been adopted!`);
                                setPetModalOpen(false);
                                refreshPets();
                              } catch (error) {
                                alert('Error adopting pet. Please try again.');
                              }
                            }
                          }}
                        >
                          Adopt {selectedPet.name}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: '#20B2AA',
                            color: '#20B2AA',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            '&:hover': {
                              borderColor: '#1A9B96',
                              backgroundColor: 'rgba(32, 178, 170, 0.04)',
                            },
                          }}
                          onClick={() => {
                            window.location.href = `mailto:info@pawgrammers.org?subject=Inquiry about ${selectedPet.name}&body=Hi, I would like more information about adopting ${selectedPet.name}.`;
                          }}
                        >
                          Contact Shelter
                        </Button>
                      </Box>
                    )}
                    {selectedPet.adopted && (
                      <Box sx={{
                        p: 2,
                        backgroundColor: '#E8F5E9',
                        borderRadius: 2,
                        textAlign: 'center',
                        mt: 'auto',
                      }}>
                        <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                          ✓ This pet has been adopted!
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default Dashboard;

