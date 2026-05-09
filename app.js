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

setInterval(
  () => {
    isBroken = true

    setTimeout(
      () => {
        isBroken = false
      },
      5 * 60 * 1000,
    ) // broken for 5 min
  },
  13 * 60 * 1000,
) // breaks every 13 min

app.get('/error', (req, res) => {
  if (isBroken) {
    return res.status(500).json({ error: 'app is broken' })
  }
  res.send('ok')
})

const start = async () => {
  await app.listen(PORT)
  console.log(`server started on port ${PORT}`)
}

start()
