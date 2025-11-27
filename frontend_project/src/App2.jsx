import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import TutorList from './pages/TutorList'
import TutorProfile from './pages/TutorProfile'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

function NavBar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    // reload to clear state
    window.location.href = '/login'
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Home Tutor Finder
        </Typography>
        <Button color="inherit" component={Link} to="/tutors">
          Tutors
        </Button>
        {!token && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
        {token && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default function App() {
  return (
    <Box>
      <NavBar />
      <Routes>
        <Route path="/" element={<TutorList />} />
        <Route path="/tutors" element={<TutorList />} />
        <Route path="/tutors/:id" element={<TutorProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  )
}
