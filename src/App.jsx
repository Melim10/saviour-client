import './App.css'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/homepage" element={<HomePage />}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  
  )
}

export default App
