const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5001
app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('1')
})
app.get('/health', (req, res) => {
  res.send('ok')
})
let isBroken = false

app.get('/error', (req, res) => {
  if (isBroken) {
    return res.status(500).json({ error: 'app is broken' })
  }

  res.send('ok')
  setTimeout(
    () => {
      isBroken = true
      setTimeout(
        () => {
          isBroken = false
        },
        15 * 60 * 1000,
      )
    },
    5 * 60 * 1000,
  )
})

const start = async () => {
  await app.listen(PORT)
  console.log(`server started on port ${PORT}`)
}

start()
