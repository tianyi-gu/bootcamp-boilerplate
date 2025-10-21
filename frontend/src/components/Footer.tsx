import { Box, Container, Typography, Grid, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#F8F9FA',
        borderTop: '1px solid #E7EBF0',
        py: 8, 
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1E1919', fontWeight: 700, mb: 2 }}>
              Adopt a Pet
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', lineHeight: 1.6, mb: 2 }}>
              Want to bring home a new pet? Adopt a Pet is a free pet adoption site, partnering with 15,000 shelters and rescues across the U.S. and Canada.
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', lineHeight: 1.6 }}>
              We'll help you find the right pet faster with tools like search filters, New Pet Alerts, and adoption advice—so you're supported from the first search to the first day with your new best friend.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1E1919', fontWeight: 700, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1.5, fontSize: 20, color: '#20B2AA', mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: '#637381' }}>
                123 Pet Street, Boston, MA 02101
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1.5, fontSize: 20, color: '#20B2AA' }} />
              <Typography variant="body2" sx={{ color: '#637381' }}>
                (617) 555-PETS
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1.5, fontSize: 20, color: '#20B2AA' }} />
              <Typography variant="body2" sx={{ color: '#637381' }}>
                info@adoptapet.org
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1E1919', fontWeight: 700, mb: 2 }}>
              Hours
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', mb: 1 }}>
              Monday - Friday: 9:00 AM - 6:00 PM
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', mb: 1 }}>
              Saturday: 10:00 AM - 4:00 PM
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', mb: 3 }}>
              Sunday: Closed
            </Typography>
            <Typography variant="body2" sx={{ color: '#637381', fontWeight: 500 }}>
              New to pet adoption? Start here.
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid #E7EBF0', mt: 6, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#637381' }}>
            © 2024 Adopt a Pet. All rights reserved.
            <Link 
              href="#" 
              sx={{ 
                mx: 1.5, 
                color: '#637381',
                textDecoration: 'none',
                '&:hover': { color: '#20B2AA' },
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
                '&:hover': { color: '#20B2AA' },
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

