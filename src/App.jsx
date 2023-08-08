import './App.css'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Organigrama } from './pages/Organigrama/Organigrama'
import { Provider } from 'react-redux'
import { store } from './redux/app/store'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Organigrama/>} />
          <Route path='/organigrama' element={<Organigrama />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App
