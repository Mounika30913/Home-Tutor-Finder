import React, { useState } from 'react'
import api from '../api'
import { useNavigate, Link } from 'react-router-dom'
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/register', { email, password, role })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        navigate('/tutors')
      } else {
        setError(res.data.error || 'Registration failed')
      }
    } catch (err) {
      setError('Could not register. Maybe email already exists.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControl>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="STUDENT">Student</MenuItem>
              <MenuItem value="TUTOR">Tutor</MenuItem>
            </Select>
          </FormControl>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained">
            Register
          </Button>
          <Typography variant="body2">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
