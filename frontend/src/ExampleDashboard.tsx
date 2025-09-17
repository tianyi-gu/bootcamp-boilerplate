import './ExampleDashboard.css'
import {useState, useEffect} from 'react'
//import pets from './examplepets.json' 
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {getPets} from './ExampleApi'

function ExampleDashboard() {

  const [data, setData] = useState<Array<{
    _id: String;
    name: String;
    breed: String;
    age: String;
  }>>([])

  const refreshPets = async () => {
    const data = await getPets()
    if (data) {
      (setData(data))
    }
  }

  useEffect(() => {
    refreshPets();
  }, [])

  const petCards = data.map((pet: any) => {
    return (
      <div key={pet._id}>
        <Card sx={{maxWidth: 350, m: 3}}>
          <CardMedia sx={{height: 300}}image={pet.url}/>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {pet.name}
            </Typography>
            <Typography gutterBottom variant="body2">
              {pet.breed}, {pet.age} yrs
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  })

  return (
    <>
      <div>
        <div className="dashboard_container"> 
          <div className="dashboard">
            <div className="pets-container">
              {petCards}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExampleDashboard
