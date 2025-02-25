#!/usr/bin/env node

import express from 'express';
import fs, { readFileSync } from 'fs';
import pc from 'picocolors';

const app = express()
app.disabled('x-powered-by')
const port = process.env.PORT ?? 8080
// apis
const apiGoku = JSON.parse(readFileSync('./api/goku.json', 'utf-8'))
const apivegeta = JSON.parse(readFileSync('./api/vegeta.json', 'utf-8'))

// Welcome the API
app.get('/', (req, res) => {
   console.log(pc.blue('peticion recivida...', req.url))
   fs.readFile('./html/ruta1/index.html', 'utf-8', (err, data) => {
      if (err) {
         return res.status(404).send('<h1> Error 404 Not Font </h1>')
      } else if (data) {
         return res.status(200).send(data)
      } else {
         return res.status(500).send('error en el servidor')
      }
   })
})

// GET
// API de goku
app.get('/goku.json', (req, res) => {
   console.log(pc.blue('peticion recivida...', req.url))
   try {
      res.status(200).send(apiGoku)
   } catch (error) {
      res.status(404).send('<h1> Error 404 </h1>')
   }
})

// api de vegeta
app.get('/vegeta.json', (req, res) => {
   console.log(pc.blue('peticion recivida...', req.url))
   try {
      res.status(200).send(apivegeta)
   } catch (error) {
      res.status(404).send('404 not font')
   }
})

// POST
// post para goku
app.post('/goku.json', (req, res) => {
   let body = ""
   req.on('data', chunk => {
      body += chunk.toString()
   })

   req.on('end', () => {
      const data = JSON.parse(body)
      res.status(200).send(data)
   })
})

// post para vegete
app.post('/vegete.json', (req, res) => {
   let body = ""
   req.on('data', chunk => {
      body += chunk.toString()
   })

   req.on('end', () => {
      const data = JSON.parse(body)
      res.status(200).send(data)
   })
})
//leido de archivos
app.use('/ruta1', express.static('./html/ruta1'))

// el puerto  y los enlases
app.listen(port, () => {
   console.table({
      url: "http://localhost:" + port,
      url2: "http://192.168.0.144:" + port
   })
})

