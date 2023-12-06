import './App.css'
import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage_Styled from './pages/SignUpPage_Styled'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import NewQuestion from './pages/NewQuestionPage'
import QuestionDetailsPage from './pages/QuestionDetailsPage'
import UserProfilePage from './pages/UserProfilePage'
import MyQuestions from './pages/MyQuestionsPage'
import RankingPage from './pages/RankingPage'
import MenuAppBar from './components/NavBar_Styled'

function App() {

  return (
    <div>
      <MenuAppBar />
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/x" element={<LoginPage />}/>
        <Route path ="/homepage" element={<HomePage/>}/>
        <Route path="/my-questions" element={<MyQuestions />}/>
        <Route path="/signup" element={<SignUpPage_Styled/>}/>
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
