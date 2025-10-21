import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { createPet } from '../ExampleApi';

type AddPetDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdded: () => Promise<void> | void;
};

function AddPetDialog({ open, onClose, onAdded }: AddPetDialogProps) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [species, setSpecies] = useState('Dog');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Boston');
  const [sex, setSex] = useState('M');
  const [adopted, setAdopted] = useState(false);
  const [featuredPetOfWeek, setFeaturedPetOfWeek] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !breed || !age) return;
    try {
      setSubmitting(true);
      await createPet({
        name,
        breed,
        age,
        species,
        url,
        description,
        location,
        sex,
        adopted,
        featuredPetOfWeek
      });
      // Reset form
      setName('');
      setBreed('');
      setAge('');
      setSpecies('Dog');
      setUrl('');
      setDescription('');
      setLocation('Boston');
      setSex('M');
      setAdopted(false);
      setFeaturedPetOfWeek(false);
      onClose();
      await onAdded();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !submitting && onClose()} fullWidth maxWidth="md">
      <DialogTitle>Add a New Pet</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
              fullWidth
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Age (years)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              type="number"
              fullWidth
            />
            <TextField
              select
              label="Species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              fullWidth
            >
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
              <MenuItem value="Bird">Bird</MenuItem>
              <MenuItem value="Rabbit">Rabbit</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              fullWidth
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </TextField>
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </Box>

          <TextField
            label="Picture URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/pet-image.jpg"
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            placeholder="Tell us about this pet..."
            fullWidth
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={adopted}
                  onChange={(e) => setAdopted(e.target.checked)}
                />
              }
              label="Already Adopted"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={featuredPetOfWeek}
                  onChange={(e) => setFeaturedPetOfWeek(e.target.checked)}
                />
              }
              label="Feature as Pet of the Week"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting || !name || !breed || !age}
        >
          {submitting ? 'Adding...' : 'Add Pet'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPetDialog;

