In this project distributed server generate random logs and all that listen in main server which can fetch from api.

To start project
In terminal, Use Node.js version 22</br>
npm i -> To install dependencies</br>
node app -> To start server main server</br>
node server1 -> To start server 1</br>
node server2 -> To start server 2</br>
node server3 -> To start server 3</br>

API for fetch all logs

GET: localhost:3000/logs/all

API for fetch server specific logs

GET: localhost:3000/logs/:id
