import { Outlet } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/layout/AuthLayout'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/login/Login'
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
