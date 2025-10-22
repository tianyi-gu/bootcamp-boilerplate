import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PetsIcon from '@mui/icons-material/Pets';

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      {/* Hero Section with Video Background */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 64px)', // Subtract nav height
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* YouTube Video Background */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '100vh',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            '& iframe': {
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100vh',
              minWidth: '177.77vh', // 16:9 aspect ratio
              transform: 'translate(-50%, -50%)',
            }
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/IAIo-pUDl0s?autoplay=1&mute=1&loop=1&playlist=IAIo-pUDl0s&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{
              pointerEvents: 'none',
            }}
          />
        </Box>

        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
            px: 3,
          }}
        >
          {/* Logo/Icon */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                p: 3,
                display: 'inline-flex',
              }}
            >
              <PetsIcon sx={{ fontSize: 60, color: 'white' }} />
            </Box>
          </Box>

          {/* Main Tagline */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              mb: 2,
              color: '#FFFFFF',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Every Pet Deserves
            <br />
            A Loving Home
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              mb: 5,
              color: '#FFFFFF',
              opacity: 0.95,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Join us in making a difference. Adopt a furry friend today and change two lives forever – yours and theirs.
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
            startIcon={<PetsIcon />}
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              py: 2,
              px: 5,
              borderRadius: 3,
              backgroundColor: '#20B2AA',
              color: 'white',
              textTransform: 'none',
              boxShadow: '0 8px 30px rgba(32, 178, 170, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#1A9B96',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 40px rgba(32, 178, 170, 0.5)',
              },
            }}
          >
            Find Your Perfect Pet
          </Button>

          {/* Stats Section */}
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 4, md: 8 },
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: '#FFFFFF',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                500+
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#FFFFFF',
                  opacity: 0.9,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                Pets Adopted
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: '#FFFFFF',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                100%
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#FFFFFF',
                  opacity: 0.9,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                Love Guaranteed
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: '#FFFFFF',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                24/7
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#FFFFFF',
                  opacity: 0.9,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                Support Available
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default Home;

