import React, { useEffect, useState } from 'react'
import api from '../api'
import { useParams } from 'react-router-dom'
import { Container, Typography, Box, Button, Paper } from '@mui/material'

export default function TutorProfile() {
  const { id } = useParams()
  const [tutor, setTutor] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/tutors/${id}`)
        setTutor(res.data)
      } catch (err) {
        console.error('Failed to load tutor', err)
      }
    }
    load()
  }, [id])

  if (!tutor) return <Typography sx={{ mt: 4, textAlign: 'center' }}>Loading...</Typography>

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4">{tutor.name}</Typography>
        <Typography variant="h6" color="text.secondary">
          {tutor.subject} · {tutor.location}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>Availability: {tutor.availability}</Typography>
          <Typography>Fee per session: ₹{tutor.fee}</Typography>
          <Typography sx={{ mt: 2 }}>{tutor.bio}</Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained">Request Session</Button>
        </Box>
      </Paper>
    </Container>
  )
}
