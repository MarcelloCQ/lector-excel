import './App.css'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Organigrama } from './pages/Organigrama/Organigrama'
import { createHashRouter } from 'react-router-dom'

const routes = createHashRouter([
  {
    path: "/",
    element: <Organigrama />
  },
  {
    path: "/organigrama",
    element: <Organigrama />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

export default routes;
