const http = require('http');
const app  = require('./app');

app.set('port', process.env.PORT || 3000) // dire a l'application express a quel pour vas tourner 
const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log('server started on port 3000')
});