import { useState, useEffect } from 'react';
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
import { updatePet, deletePet } from '../ExampleApi';

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

type EditPetDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdated: () => Promise<void> | void;
  pet: Pet | null;
};

function EditPetDialog({ open, onClose, onUpdated, pet }: EditPetDialogProps) {
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

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setBreed(pet.breed);
      setAge(pet.age);
      setSpecies(pet.species || 'Dog');
      setUrl(pet.url || '');
      setDescription(pet.description || '');
      setLocation(pet.location || 'Boston');
      setSex(pet.sex || 'M');
      setAdopted(pet.adopted || false);
      setFeaturedPetOfWeek(pet.featuredPetOfWeek || false);
    }
  }, [pet]);

  const handleSubmit = async () => {
    if (!pet || !name || !breed || !age) return;
    try {
      setSubmitting(true);
      await updatePet(pet._id, {
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
      onClose();
      await onUpdated();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!pet || !window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      setSubmitting(true);
      await deletePet(pet._id);
      onClose();
      await onUpdated();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !submitting && onClose()} fullWidth maxWidth="md">
      <DialogTitle>Edit Pet</DialogTitle>
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
            disabled={submitting || !name || !breed || !age}
          >
            {submitting ? 'Updating...' : 'Update Pet'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default EditPetDialog;

