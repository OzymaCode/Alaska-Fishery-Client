import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Contact = () => {
  const router = useRouter()
  const styles = {
    links: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '2em',
    },
    textField: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '1em',
      color: 'white',
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .send(
        'gmail',
        'template_29d5vwd',
        {
          from_name: document.getElementById('name').value,
          source: 'Alaskan Fishery',
          message: document.getElementById('message').value,
        },
        'BLYpfPOVQllqu9RdH',
      )
      .then(
        (result) => {
          console.log(result.text)
          setContent(email.sent)
        },
        (error) => {
          console.log(error.text)
          setContent(email.error)
        },
      )
  }
  const email = {
    send: () => {
      return (
        <Paper elevation={10} style={{ padding: '1em' }}>
          <form onSubmit={handleSubmit}>
            <div>
              <div style={styles.links}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color: '#232b2b',
                  }}
                >
                  Email Me
                </Typography>
              </div>
              <div style={styles.links}>
                <TextField
                  required
                  id="name"
                  label="Your Email"
                  fullWidth
                  type="name"
                  className="outlined-required"
                />
              </div>
              <div style={styles.links}>
                <TextField
                  required
                  label="Message"
                  id="message"
                  fullWidth
                  multiline
                  type="message"
                  rows={4}
                  className="outlined-required"
                />
              </div>
              <div style={styles.links} sx={{ color: '#232b2b' }}>
                <Button type="submit" variant="outlined" fullWidth>
                  Send
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      )
    },
    sent: () => {
      return (
        <div>
          <h1>Message Sent.</h1>
        </div>
      )
    },
    error: () => {
      return (
        <div>
          <h1>Something went wrong. Sorry.</h1>
        </div>
      )
    },
  }
  const [content, setContent] = useState(email.send)

  return (
    <motion.div
      className="p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Alaskan Fishery | Contact</title>
        <link rel="icon" href="/fish-icon.webp" />
      </Head>
      {content}
    </motion.div>
  )
}

export default Contact
