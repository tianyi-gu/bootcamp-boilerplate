import { useState } from 'react';
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
import { createProduct } from '../ExampleApi';

type AddProductDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdded: () => Promise<void> | void;
};

function AddProductDialog({ open, onClose, onAdded }: AddProductDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Toys');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name) return;
    try {
      setSubmitting(true);
      await createProduct({
        name,
        category,
        price,
        url,
        description,
        inStock
      });
      // Reset form
      setName('');
      setCategory('Toys');
      setPrice('');
      setUrl('');
      setDescription('');
      setInStock(true);
      onClose();
      await onAdded();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !submitting && onClose()} fullWidth maxWidth="md">
      <DialogTitle>Add New Product</DialogTitle>
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
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting || !name}
        >
          {submitting ? 'Adding...' : 'Add Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductDialog;

