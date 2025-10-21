import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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
      <Toolbar sx={{ py: 1 }}>
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
          <PetsIcon sx={{ mr: 1.5, fontSize: 28, color: '#0061FF' }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              color: '#1E1919',
              letterSpacing: '-0.02em',
            }}
          >
            Pawgrammers
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Button 
            onClick={() => navigate('/')}
            sx={{
              color: isActive('/') ? '#0061FF' : '#637381',
              backgroundColor: isActive('/') ? 'rgba(0, 97, 255, 0.08)' : 'transparent',
              fontWeight: isActive('/') ? 600 : 500,
              px: 2,
              '&:hover': {
                backgroundColor: isActive('/') ? 'rgba(0, 97, 255, 0.12)' : 'rgba(0, 97, 255, 0.04)',
              },
            }}
          >
            Dashboard
          </Button>
          <Button 
            onClick={() => navigate('/events')}
            sx={{
              color: isActive('/events') || isActive('/event') ? '#0061FF' : '#637381',
              backgroundColor: (isActive('/events') || isActive('/event')) ? 'rgba(0, 97, 255, 0.08)' : 'transparent',
              fontWeight: (isActive('/events') || isActive('/event')) ? 600 : 500,
              px: 2,
              '&:hover': {
                backgroundColor: (isActive('/events') || isActive('/event')) ? 'rgba(0, 97, 255, 0.12)' : 'rgba(0, 97, 255, 0.04)',
              },
            }}
          >
            Events
          </Button>
          <Button 
            onClick={() => navigate('/products')}
            sx={{
              color: isActive('/products') ? '#0061FF' : '#637381',
              backgroundColor: isActive('/products') ? 'rgba(0, 97, 255, 0.08)' : 'transparent',
              fontWeight: isActive('/products') ? 600 : 500,
              px: 2,
              '&:hover': {
                backgroundColor: isActive('/products') ? 'rgba(0, 97, 255, 0.12)' : 'rgba(0, 97, 255, 0.04)',
              },
            }}
          >
            Products
          </Button>
          <Button 
            onClick={() => navigate('/map')}
            sx={{
              color: isActive('/map') ? '#0061FF' : '#637381',
              backgroundColor: isActive('/map') ? 'rgba(0, 97, 255, 0.08)' : 'transparent',
              fontWeight: isActive('/map') ? 600 : 500,
              px: 2,
              '&:hover': {
                backgroundColor: isActive('/map') ? 'rgba(0, 97, 255, 0.12)' : 'rgba(0, 97, 255, 0.04)',
              },
            }}
          >
            Map
          </Button>
          <Button 
            onClick={() => navigate('/adoptees')}
            sx={{
              color: isActive('/adoptees') ? '#0061FF' : '#637381',
              backgroundColor: isActive('/adoptees') ? 'rgba(0, 97, 255, 0.08)' : 'transparent',
              fontWeight: isActive('/adoptees') ? 600 : 500,
              px: 2,
              '&:hover': {
                backgroundColor: isActive('/adoptees') ? 'rgba(0, 97, 255, 0.12)' : 'rgba(0, 97, 255, 0.04)',
              },
            }}
          >
            Adoptees
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;

