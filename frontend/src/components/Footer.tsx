import { Box, Container, Typography, Grid, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E7EBF0',
        py: 6, 
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1E1919', fontWeight: 600 }}>
              Pawgrammers
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', lineHeight: 1.6 }}>
              Helping pets find their forever homes since 2024. 
              We're dedicated to connecting loving families with adorable animals.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1E1919', fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 18, color: '#0061FF', mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: '#637381' }}>
                123 Pet Street, Boston, MA 02101
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 18, color: '#0061FF' }} />
              <Typography variant="body2" sx={{ color: '#637381' }}>
                (617) 555-PETS
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1, fontSize: 18, color: '#0061FF' }} />
              <Typography variant="body2" sx={{ color: '#637381' }}>
                info@pawgrammers.org
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1E1919', fontWeight: 600 }}>
              Hours
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', mb: 0.5 }}>
              Monday - Friday: 9:00 AM - 6:00 PM
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', mb: 0.5 }}>
              Saturday: 10:00 AM - 4:00 PM
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381' }}>
              Sunday: Closed
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid #E7EBF0', mt: 4, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#637381' }}>
            © 2024 Pawgrammers. All rights reserved.
            <Link 
              href="#" 
              sx={{ 
                mx: 1.5, 
                color: '#637381',
                textDecoration: 'none',
                '&:hover': { color: '#0061FF' },
                transition: 'color 0.2s',
              }}
            >
              Privacy Policy
            </Link>
            |
            <Link 
              href="#" 
              sx={{ 
                mx: 1.5,
                color: '#637381',
                textDecoration: 'none',
                '&:hover': { color: '#0061FF' },
                transition: 'color 0.2s',
              }}
            >
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;

