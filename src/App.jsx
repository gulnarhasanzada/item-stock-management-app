import { Outlet } from 'react-router-dom'
import './App.css'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <>
      <AppRouter/>
      <Outlet/>
    </>
  )
}

export default App
