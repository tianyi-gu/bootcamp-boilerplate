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
import { FaMapMarkerAlt } from "react-icons/fa";
import ExampleSubmitComponent from './ExampleSubmitComponent'
import ExampleEditComponent from './ExampleEditComponent'

function ExampleDashboard() {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(['all']))
  const [searchTerm, setSearchTerm] = useState<string>('');
    
  const getFilteredPets = () => {
    const normalizedSearch = (searchTerm || '').trim().toLowerCase()
    let results = pets

    if (selectedCategories && selectedCategories.size > 0) {
      if (selectedCategories.has('all')) {
        results = pets
      } else {
        results = pets.filter((pet: any) => {
          const species = (pet.species || '').toLowerCase()
          const isCatDog = species === 'cat' || species === 'dog'
          const inBasic = selectedCategories.has(species)
          const inOther = selectedCategories.has('other') && !isCatDog
          return inBasic || inOther
        })
      }
    }

    if (normalizedSearch.length > 0) {
      results = results.filter((pet: any) => {
        const name = (pet.name || '').toLowerCase()
        return name.includes(normalizedSearch)
      })
    }  
    return results
  };

  const filteredPets = getFilteredPets(); 
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };


  const petCards = filteredPets.map((pet: any) => { //for local json file: change "data" to "pets" and uncomment the json import  
    return (
      <div>
          <div key={pet._id} className="pet-grid-item">
              <CardActionArea onClick={() => handleToggleExpand(pet._id?.$oid || pet._id)}>
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
                    <b>Breed</b>: {pet.breed}{pet.age ? `, ${pet.age} yrs` : ''}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    <b>Description:</b> {pet.description}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    <FaMapMarkerAlt />
                    <b> Location:</b> {pet.location}
                  </Typography>
                  {pet.sex === 'm' ? (
                          <MaleIcon color="primary" fontSize="small" />
                        ) : (
                          <FemaleIcon sx={{ color: '	#c90076' }} fontSize="small" />
                    )}
                    {expandedId === (pet._id?.$oid || pet._id) && (
                    <Box sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                      <Typography variant="body2" color="text.secondary">
                        <b>More about {pet.name}:</b> {pet.description || 'No additional details.'}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </CardActionArea>
          </div>
      </div>
    )
  });
  
  function addCategory(previousState: Set<string>, category: string): Set<string> {
    const next = new Set(previousState)

    if (category === 'all') {
      return new Set(['all'])
    }

    next.delete('all')

    if (next.has(category)) next.delete(category)
    else next.add(category)

    if (next.size === 0) return new Set(['all'])

    return next
  }

  
  return (
    <>
      <Container maxWidth="lg">
        <Box> 
          <h1 className="dashboard-title">Pawgrammer's Dashboard</h1>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 12 }}>
            <input
              className = "search-input"
              placeholder="Search pets"
              aria-label="Search pets"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '1.05rem'
              }}
            />
          </div>
        </Box>
        <h2 style={{color: "black"}}>Animal Categories</h2>
        <Box className="category-filter-bar" sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button 
            variant={selectedCategories.has('all') ? 'contained' : 'outlined'}
            onClick={() =>
              setSelectedCategories(prev => addCategory(prev, 'all'))
            }
            className="category-button"
          >
            All
          </Button>
          <Button 
            variant={selectedCategories.has('cat') ? 'contained' : 'outlined'}
            onClick={() =>
              setSelectedCategories(prev => addCategory(prev, 'cat'))
            }
            className="category-button"
          >
            Cats
          </Button>
          <Button 
            variant={selectedCategories.has('dog') ? 'contained' : 'outlined'}
            onClick={() =>
              setSelectedCategories(prev => addCategory(prev, 'dog'))
            }
            className="category-button"
          >
            Dogs
          </Button>
          <Button 
            variant={selectedCategories.has('other') ? 'contained' : 'outlined'}
            onClick={() =>
              setSelectedCategories(prev => addCategory(prev, 'other'))
            }
            className="category-button"
          >
            Other
          </Button>
        </Box>
        <Box>
          {/* <Button variant="contained" onClick={handleOpen}>
            Add Pet
          </Button> */}
          {/* 
            <ExampleSubmitComponent 
              open={open}
              onClose={handleClose}
              onAdded={handleAdded}/> 
          */}
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
