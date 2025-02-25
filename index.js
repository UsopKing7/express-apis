#!/usr/bin/env node

import express from 'express';
import { readFileSync } from 'fs';
import pc from 'picocolors';

const app = express()
app.disabled('x-powered-by')
const port = process.env.PORT ?? 8080
const apiGoku = JSON.parse(readFileSync('./api/goku.json', 'utf-8'))

// Welcome the API
app.get('/', (req, res) => {
   console.log(pc.blue('peticion recivida...', req.url))
   res.status(200)
   res.send('Bienvenido a las apis de dragon ball')
})

// API de goku
app.get('/goku.json', (req, res) => {
   console.log(pc.blue('peticion recivida...', req.url))
   res.status(200)
   res.send(apiGoku)
})

// el puerto  y los enlases
app.listen(port, () => {
   console.table({
      url: "http://localhost:" + port,
      url2: "http://192.168.0.144:" + port
   })
})
