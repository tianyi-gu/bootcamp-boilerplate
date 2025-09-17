import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ExampleDashboard from './ExampleDashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <Routes>
      <Route path="/" element={<ExampleDashboard />} />
    </Routes>
  </StrictMode>
  </BrowserRouter>
)
