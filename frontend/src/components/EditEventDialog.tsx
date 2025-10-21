import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { updateEvent, deleteEvent } from '../ExampleApi';

type Event = {
  _id: string;
  name: string;
  organizer?: string;
  location?: string;
  url?: string;
  description?: string;
  time?: string;
  date?: string;
};

type EditEventDialogProps = {
  open: boolean;
  onClose: () => void;
  onUpdated: () => Promise<void> | void;
  event: Event | null;
};

function EditEventDialog({ open, onClose, onUpdated, event }: EditEventDialogProps) {
  const [name, setName] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (event) {
      setName(event.name);
      setOrganizer(event.organizer || '');
      setLocation(event.location || '');
      setUrl(event.url || '');
      setDescription(event.description || '');
      setDate(event.date || '');
      setTime(event.time || '');
    }
  }, [event]);

  const handleSubmit = async () => {
    if (!event || !name) return;
    try {
      setSubmitting(true);
      await updateEvent(event._id, {
        name,
        organizer,
        location,
        url,
        description,
        date,
        time
      });
      onClose();
      await onUpdated();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!event || !window.confirm('Are you sure you want to delete this event?')) return;
    try {
      setSubmitting(true);
      await deleteEvent(event._id);
      onClose();
      await onUpdated();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => !submitting && onClose()} fullWidth maxWidth="md">
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent dividers>
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
            {submitting ? 'Updating...' : 'Update Event'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default EditEventDialog;

