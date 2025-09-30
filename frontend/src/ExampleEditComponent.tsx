import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { updatePet } from './ExampleApi'

type Pet = {
  _id: string;
  name: string;
  breed: string;
  age: string;
  url?: string;
}

type ExampleEditComponentProps = {
  open: boolean;
  onClose: () => void;
  onUpdated: () => Promise<void> | void;
  pet: Pet | null;
}

function ExampleEditComponent({ open, onClose, onUpdated, pet }: ExampleEditComponentProps) {

  const [name, setName] = useState<string>('')
  const [breed, setBreed] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)

  // Populate form when pet changes
  useEffect(() => {
    if (pet) {
      setName(pet.name)
      setBreed(pet.breed)
      setAge(pet.age)
      setUrl(pet.url || '')
    }
  }, [pet])

  const handleSubmit = async () => {
    if (!pet || !name || !breed || !age) return
    try {
      setSubmitting(true)
      await updatePet(pet._id, { name, breed, age, url: url || undefined })
      onClose()
      await onUpdated()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => !submitting && onClose()} fullWidth maxWidth="sm">
      <DialogTitle>Edit pet</DialogTitle>
      <DialogContent dividers>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 1}}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
          <TextField
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <TextField
            label="Picture URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting || !name || !breed || !age}
        >
          {submitting ? 'Updating...' : 'Update Pet'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ExampleEditComponent
