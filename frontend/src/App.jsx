import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Protectedroutes from './routes/Protectedroutes'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <Protectedroutes>
              <Dashboard />
            </Protectedroutes>
          }
        />

        <Route
          path="/upload"
          element={
            <Protectedroutes>
              <Upload />
            </Protectedroutes>
          }
        />
      </Routes>
    </>
  )
}

export default App
