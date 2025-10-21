import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E7EBF0',
      }}
    >
      <Toolbar sx={{ py: 1.5, px: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 },
            transition: 'opacity 0.2s',
          }}
          onClick={() => navigate('/')}
        >
          <PetsIcon sx={{ mr: 1.5, fontSize: 32, color: '#20B2AA' }} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              color: '#1E1919',
              letterSpacing: '-0.02em',
            }}
          >
            Adopt a Pet
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button 
            onClick={() => navigate('/')}
            sx={{
              color: isActive('/') ? '#20B2AA' : '#1E1919',
              backgroundColor: isActive('/') ? 'rgba(32, 178, 170, 0.08)' : 'transparent',
              fontWeight: isActive('/') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              '&:hover': {
                backgroundColor: isActive('/') ? 'rgba(32, 178, 170, 0.12)' : 'rgba(32, 178, 170, 0.04)',
              },
            }}
          >
            Find a Pet
          </Button>
          <Button 
            onClick={() => navigate('/events')}
            sx={{
              color: isActive('/events') || isActive('/event') ? '#20B2AA' : '#1E1919',
              backgroundColor: (isActive('/events') || isActive('/event')) ? 'rgba(32, 178, 170, 0.08)' : 'transparent',
              fontWeight: (isActive('/events') || isActive('/event')) ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              '&:hover': {
                backgroundColor: (isActive('/events') || isActive('/event')) ? 'rgba(32, 178, 170, 0.12)' : 'rgba(32, 178, 170, 0.04)',
              },
            }}
          >
            Events
          </Button>
          <Button 
            onClick={() => navigate('/products')}
            sx={{
              color: isActive('/products') ? '#20B2AA' : '#1E1919',
              backgroundColor: isActive('/products') ? 'rgba(32, 178, 170, 0.08)' : 'transparent',
              fontWeight: isActive('/products') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              '&:hover': {
                backgroundColor: isActive('/products') ? 'rgba(32, 178, 170, 0.12)' : 'rgba(32, 178, 170, 0.04)',
              },
            }}
          >
            Products
          </Button>
          <Button 
            onClick={() => navigate('/map')}
            sx={{
              color: isActive('/map') ? '#20B2AA' : '#1E1919',
              backgroundColor: isActive('/map') ? 'rgba(32, 178, 170, 0.08)' : 'transparent',
              fontWeight: isActive('/map') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              '&:hover': {
                backgroundColor: isActive('/map') ? 'rgba(32, 178, 170, 0.12)' : 'rgba(32, 178, 170, 0.04)',
              },
            }}
          >
            Map
          </Button>
          <Button 
            onClick={() => navigate('/adoptees')}
            sx={{
              color: isActive('/adoptees') ? '#20B2AA' : '#1E1919',
              backgroundColor: isActive('/adoptees') ? 'rgba(32, 178, 170, 0.08)' : 'transparent',
              fontWeight: isActive('/adoptees') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              '&:hover': {
                backgroundColor: isActive('/adoptees') ? 'rgba(32, 178, 170, 0.12)' : 'rgba(32, 178, 170, 0.04)',
              },
            }}
          >
            Previous Adoptees
          </Button>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;

