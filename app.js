const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5001
let isBroken = false
app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('1')
})
app.get('/health', (req, res) => {
  res.send('ok')
})
app.get('/error', (req, res) => {
  if (isBroken) {
    return res.status(500).json({ error: 'app is broken' })
  }
  res.send('ok')
  setTimeout(
    () => {
      console.log('hello')
      isBroken = true
      setTimeout(
        () => {
          console.log('imnner')
          isBroken = false
        },
        5 * 60 * 1000,
      )
    },
    13 * 60 * 1000,
  )
})

const start = async () => {
  await app.listen(PORT)
  console.log(`server started on port ${PORT}`)
}

start()
