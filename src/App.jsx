import './App.css'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import NavBar from './components/NavBar'
import QuestionCardDetails from './components/QuestionCardDetails'
import NewQuestion from './pages/NewQuestion'

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/questions/:questionId" element={<QuestionCardDetails />}/>
        <Route path="/new-question" element ={<NewQuestion/>} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  
  )
}

export default App
