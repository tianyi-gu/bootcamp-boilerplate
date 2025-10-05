import './ExampleDashboard.css'
import pets from './examplepets.json' 
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import { useState } from 'react'
import CardActionArea from '@mui/material/CardActionArea';


function ExampleDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const getFilteredPets = () => {
    if (selectedCategory === 'all') 
      return pets
    if (selectedCategory === 'cat') 
      return pets.filter(pet => pet.species === 'Cat')
    if (selectedCategory === 'dog') 
      return pets.filter(pet => pet.species === 'Dog')
    if (selectedCategory === 'other') 
      return pets.filter(pet => pet.species !== 'Cat' && pet.species !== 'Dog'
    )
    return pets
  }
  const filteredPets = getFilteredPets();

  const petCards = filteredPets.map((pet: any) => { //for local json file: change "data" to "pets" and uncomment the json import  
    return (
      <div>
          <div key={pet._id} className="pet-grid-item">
            <CardActionArea>
              <Card className="pet-card" sx={{height: '100%', position: 'relative'}}>
                {pet.url ? (
                  <CardMedia sx={{height: 220}} image={pet.url} />
                ) : (
                  <Box sx={{ height: 220, display: 'flex', alignItems: 'center', 
                      justifyContent: 'center', backgroundColor: '#f3f4f6'}}>
                    <Typography variant="subtitle1" color="text.secondary">
                      No pet picture 
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    Name: {pet.name}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    Breed: {pet.breed}{pet.age ? `, ${pet.age} yrs` : ''}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    Description: {pet.description}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    Location: {pet.location}
                  </Typography>
                  {pet.sex === 'm' ? (
                          <MaleIcon color="primary" fontSize="small" />
                        ) : (
                          <FemaleIcon sx={{ color: '	#c90076' }} fontSize="small" />
                    )}
                </CardContent>
              </Card>
            </CardActionArea>
          </div>
      </div>
    )
  })

  return (
    <>
      <Container maxWidth="lg">
        <Box> 
          <h1 className="dashboard-title">Pawgrammer's Dashboard</h1>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 12 }}>
            <input
              className = "search-input"
              placeholder="Search pets by name, breed, or location"
              aria-label="Search pets"
              style={{ fontSize: '1.05rem'
              }}
            />
          </div>
        </Box>
        <h2 style={{color: "black"}}>Animal Categories</h2>
        <Box className="category-filter-bar" sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button 
            variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory('all')}
            className="category-button"
          >
            All
          </Button>
          <Button 
            variant={selectedCategory === 'cat' ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory('cat')}
            className="category-button"
          >
            Cats
          </Button>
          <Button 
            variant={selectedCategory === 'dog' ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory('dog')}
            className="category-button"
          >
            Dogs
          </Button>
          <Button 
            variant={selectedCategory === 'other' ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory('other')}
            className="category-button"
          >
            Other
          </Button>
        </Box>

        <Box className="dashboard" sx={{py: 4}}>
          <div className="pet-grid">
            {petCards}
          </div>
        </Box>
      </Container>
    </>
  )
}

export default ExampleDashboard
