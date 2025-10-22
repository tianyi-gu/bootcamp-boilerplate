import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './ExampleTheme.ts'
import 'leaflet/dist/leaflet.css'
import Home from './pages/Home.tsx'
import Dashboard from './pages/Dashboard.tsx'
import PetDetail from './pages/PetDetail.tsx'
import Events from './pages/Events.tsx'
import EventDetail from './pages/EventDetail.tsx'
import Products from './pages/Products.tsx'
import Adoptees from './pages/Adoptees.tsx'
import Map from './pages/Map.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/adoptees" element={<Adoptees />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </ThemeProvider>
  </StrictMode>
  </BrowserRouter>
)
