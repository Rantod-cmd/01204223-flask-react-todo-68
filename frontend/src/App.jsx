import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css'
import TodoList from './TodoList.jsx'
import LoginForm from './LoginForm.jsx'
import PrivateRoute from './PrivateRoute.jsx'

function App() {
  const TODOLIST_API_URL = '/api/todos/';
  const TODOLIST_LOGIN_URL = '/api/login/';

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <LoginForm loginUrl={TODOLIST_LOGIN_URL} />
          } />
          <Route path="/" element={
            <PrivateRoute>
              <TodoList apiUrl={TODOLIST_API_URL}/>
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
