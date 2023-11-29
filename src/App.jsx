import './App.css'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import NavBar from './components/NavBar'
import QuestionCardDetails from './components/QuestionCardDetails'

function App() {

  return (
    <div>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/homepage" element={<HomePage />}/>
      <Route path="/questions/:questionId" element={<QuestionCardDetails />}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    </div>
  
  )
}

export default App
