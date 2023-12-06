import './App.css'
import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import NavBar from './components/NavBar'
import NewQuestion from './pages/NewQuestionPage'
import QuestionDetailsPage from './pages/QuestionDetailsPage'
import UserProfilePage from './pages/UserProfilePage'
import MyQuestions from './pages/MyQuestionsPage'
import RankingPage from './pages/RankingPage'

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/my-questions" element={<MyQuestions />}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/questions/:questionId" element={<QuestionDetailsPage />}/>
        <Route path="/new-question" element ={<NewQuestion/>} />
        <Route path="/users/:userId" element ={<UserProfilePage/>}/>
        <Route path='/ranking' element={<RankingPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  
  )
}

export default App
