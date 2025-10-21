import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getProducts } from '../ExampleApi';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AddProductDialog from '../components/AddProductDialog';
import EditProductDialog from '../components/EditProductDialog';

type Product = {
  _id: string;
  name: string;
  category?: string;
  price?: string;
  url?: string;
  description?: string;
  inStock?: boolean;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const refreshProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProducts();
      setProducts(data || []);
    } catch (e: any) {
      setError('Error loading products: ' + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const productCards = products.map((product: Product) => (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
      <Card 
        sx={{ 
          height: 440,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {product.url ? (
          <CardMedia 
            sx={{ 
              height: 220,
              flexShrink: 0,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }} 
            image={product.url} 
          />
        ) : (
          <Box sx={{ 
            height: 220,
            flexShrink: 0,
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: 'rgba(123, 97, 255, 0.06)'
          }}>
            <Box sx={{ 
              backgroundColor: 'rgba(123, 97, 255, 0.1)',
              borderRadius: '50%',
              p: 2,
            }}>
              <ShoppingCartIcon sx={{ fontSize: 48, color: '#7B61FF' }} />
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
            {product.name}
          </Typography>
          
          {product.price && (
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#0061FF',
                fontWeight: 600,
                mb: 1,
              }}
            >
              ${product.price}
            </Typography>
          )}
          
          {product.description && (
            <Typography 
              variant="body2"
              sx={{
                color: '#637381',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                mb: 1.5,
              }}
            >
              {product.description}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 'auto' }}>
            {product.category && (
              <Chip 
                label={product.category}
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(123, 97, 255, 0.08)',
                  color: '#7B61FF',
                  fontWeight: 500,
                  border: 'none',
                }}
              />
            )}
            {product.inStock !== undefined && (
              <Chip 
                label={product.inStock ? 'In Stock' : 'Out of Stock'}
                size="small"
                sx={{
                  backgroundColor: product.inStock ? 'rgba(0, 200, 117, 0.08)' : 'rgba(226, 68, 92, 0.08)',
                  color: product.inStock ? '#00C875' : '#E2445C',
                  fontWeight: 500,
                  border: 'none',
                }}
              />
            )}
          </Box>

          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
              setEditOpen(true);
            }}
            size="small"
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: '#1E1919',
              letterSpacing: '-0.02em',
            }}
          >
            Pet Products & Supplies
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddOpen(true)}
          >
            Add Product
          </Button>
        </Box>

        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: '#637381',
            lineHeight: 1.7,
            mb: 4,
          }}
        >
          Browse our selection of quality pet products, toys, food, and accessories. 
          All proceeds support our shelter operations and help more pets find homes!
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && products.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No products available yet
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddOpen(true)}
              sx={{ mt: 2 }}
            >
              Add First Product
            </Button>
          </Box>
        )}

        {!loading && !error && products.length > 0 && (
          <Grid container spacing={3}>
            {productCards}
          </Grid>
        )}
      </Container>

      <Footer />

      <AddProductDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdded={refreshProducts}
      />

      <EditProductDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdated={refreshProducts}
        product={selectedProduct}
      />
    </Box>
  );
}

export default Products;

