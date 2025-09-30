import './ExampleDashboard.css'
import pets from './examplepets.json' 
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function ExampleDashboard() {

  const petCards = pets.map((pet: any) => {
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
