import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  MenuItem
} from '@mui/material';
import { updateProduct, deleteProduct } from '../ExampleApi';

type Product = {
  _id: string;
  name: string;
  category?: string;
  price?: string;
  url?: string;
  description?: string;
  inStock?: boolean;
};

type EditProductDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdated: () => Promise<void> | void;
  product: Product | null;
};

function EditProductDialog({ open, onClose, onUpdated, product }: EditProductDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Toys');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category || 'Toys');
      setPrice(product.price || '');
      setUrl(product.url || '');
      setDescription(product.description || '');
      setInStock(product.inStock !== undefined ? product.inStock : true);
    }
  }, [product]);

  const handleSubmit = async () => {
    if (!product || !name) return;
    try {
      setSubmitting(true);
      await updateProduct(product._id, {
        name,
        category,
        price,
        url,
        description,
        inStock
      });
      onClose();
      await onUpdated();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!product || !window.confirm('Are you sure you want to delete this product?')) return;
    try {
      setSubmitting(true);
      await deleteProduct(product._id);
      onClose();
      await onUpdated();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !submitting && onClose()} fullWidth maxWidth="md">
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            >
              <MenuItem value="Toys">Toys</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Grooming">Grooming</MenuItem>
              <MenuItem value="Health">Health & Wellness</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="19.99"
              type="number"
              fullWidth
            />
          </Box>

          <TextField
            label="Image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/product-image.jpg"
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            placeholder="Describe the product..."
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
            }
            label="In Stock"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={handleDelete} disabled={submitting} color="error">
          Delete
        </Button>
        <Box>
          <Button onClick={onClose} disabled={submitting} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting || !name}
          >
            {submitting ? 'Updating...' : 'Update Product'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default EditProductDialog;

