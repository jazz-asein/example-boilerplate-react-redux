/* eslint-disable import/no-duplicates */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import Html from '../client/html'

const { writeFile, readFile, unlink } = require('fs').promises

let connections = []

const port = process.env.PORT || 3000
const server = express()

server.use(cors())

server.use(express.static(path.resolve(__dirname, '../dist/assets')))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

server.use(cookieParser())

const wrFile = async (users) => {
  await writeFile(`${__dirname}/users.json`, JSON.stringify(users), { encoding: 'utf8' })
}

const rFile = () => {
  return readFile(`${__dirname}/users.json`, { encoding: 'utf8' })
    .then((data) => JSON.parse(data)) /* вернется текст, а не объект джаваскрипта */
    .catch(async () => {
      const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users')
      await wrFile(users)
      return users
    }) /* случается когда нет файла */
}

server.get('/api/v1/users', async (req, res) => {
  const users = await rFile()
  res.json(users)
}) // read data and give to frontend

server.post('/api/v1/users', async (req, res) => {
  const newUser = req.body
  const users = await rFile()
  const newId = users[users.length - 1].id + 1
  const newUsers = [...users, { ...newUser, id: newId }]
  await wrFile(newUsers)
  res.json({ status: 'success', id: newId })
}) // read and write the data

server.patch('/api/v1/users/:userId', async (req, res) => {
  const newUser = req.body
  const { userId } = req.params
  const users = await rFile()
  const red = users.reduce(
    (acc, rec) => (rec.id === +userId ? [...acc, { ...rec, ...newUser }] : [...acc, rec]),
    []
  )
  await wrFile(red)
  res.json({ status: 'success', id: userId })
}) // read -> add write //update

server.delete('/api/v1/users/:userId', async (req, res) => {
  const { userId } = req.params
  const users = await rFile()
  users.filter((el) => el.id !== userId)
  await wrFile()
  res.json({ status: 'success', id: userId })
}) // read delete and write

server.delete('/api/v1/users', (req, res) => {
  unlink(wrFile())
  res.json({ status: 'success' })
}) // delete file

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const echo = sockjs.createServer()
echo.on('connection', (conn) => {
  connections.push(conn)
  conn.on('data', async () => {})

  conn.on('close', () => {
    connections = connections.filter((c) => c.readyState !== 3)
  })
})

server.get('/', (req, res) => {
  // const body = renderToString(<Root />);
  const title = 'Server side Rendering'
  res.send(
    Html({
      body: '',
      title
    })
  )
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

echo.installHandlers(app, { prefix: '/ws' })

// eslint-disable-next-line no-console
console.log(`Serving at http://localhost:${port}`)
