import React, { useEffect, useState } from 'react'
import api from '../api'
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material'
import { Link } from 'react-router-dom'

export default function TutorList() {
  const [tutors, setTutors] = useState([])
  const [subject, setSubject] = useState('')
  const [location, setLocation] = useState('')

  const loadAll = async () => {
    try {
      const res = await api.get('/tutors')
      setTutors(res.data)
    } catch (err) {
      console.error('Failed to load tutors', err)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const handleSearch = async () => {
    const params = {}
    if (subject) params.subject = subject
    if (location) params.location = location
    try {
      const res = await api.get('/tutors', { params })
      setTutors(res.data)
    } catch (err) {
      console.error('Search failed', err)
    }
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find a Home Tutor
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap" sx={{ mb: 3 }}>
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={loadAll}>
          Reset
        </Button>
      </Box>

      <Grid container spacing={2}>
        {tutors.map((tutor) => (
          <Grid item xs={12} md={4} key={tutor.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{tutor.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {tutor.subject} · {tutor.location}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Fee per session: ₹{tutor.fee}
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/tutors/${tutor.id}`}
                  sx={{ mt: 2 }}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {tutors.length === 0 && (
          <Typography sx={{ mt: 2 }}>No tutors found.</Typography>
        )}
      </Grid>
    </Container>
  )
}
