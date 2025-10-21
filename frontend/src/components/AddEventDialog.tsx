import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import { createEvent } from '../ExampleApi';

type AddEventDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdded: () => Promise<void> | void;
};

function AddEventDialog({ open, onClose, onAdded }: AddEventDialogProps) {
  const [name, setName] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name) return;
    try {
      setSubmitting(true);
      setError('');
      await createEvent({
        name,
        organizer,
        location,
        url,
        description,
        date,
        time
      });
      // Reset form
      setName('');
      setOrganizer('');
      setLocation('');
      setUrl('');
      setDescription('');
      setDate('');
      setTime('');
      onClose();
      await onAdded();
    } catch (err: any) {
      console.error('Error adding event:', err);
      setError('Failed to add event. Please check the console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !submitting && onClose()} fullWidth maxWidth="md">
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          
          <TextField
            label="Organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            fullWidth
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., March 15, 2024"
              fullWidth
            />
            <TextField
              label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 2:00 PM"
              fullWidth
            />
          </Box>

          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
          />

          <TextField
            label="Image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/event-image.jpg"
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            placeholder="Tell us about this event..."
            fullWidth
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
          {submitting ? 'Adding...' : 'Add Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEventDialog;

