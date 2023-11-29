import './App.css'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import NavBar from './components/NavBar'
import NewQuestion from './pages/NewQuestionPage'
import QuestionDetailsPage from './pages/QuestionDetailsPage'

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/questions/:questionId" element={<QuestionDetailsPage />}/>
        <Route path="/new-question" element ={<NewQuestion/>} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  
  )
}

export default App
