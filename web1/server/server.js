const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
var iPortaTcp = 4201;
var sIpAddress = "127.0.0.1"
app.listen(iPortaTcp,sIpAddress, () => console.log('API is running on http://' + sIpAddress + ':' + iPortaTcp));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//pagina di invio della form
app.get('/formRegistrazione', (req, res) => {
    console.log("Mi hai chiesto la form di registrazione");
    res.sendFile("formSemplice.html", { root: './htdoc' });
});

//pagina di invio della form
app.get('/sendfile', (req, res) => {
    console.log("Mi hai chiesto la form di send file");
    res.sendFile("sendfile.html", { root: './htdoc' });
});

//pagina di gestione dei dati della form se il metodo è GET
app.get('/gestisciDatiForm', (req, res) => {
    console.log(req.query.fname);
    res.send("<html>Buona serata a " + req.query.fname + " " + req.query.fcognome + "</html>");
});

app.post('/mansendfile', (req, res) => {
    console.log(req.body)
    if (req.body.password == 'paperino'){
        res.send("<html> Bravo " + req.body.email + " sono pronto a ricevere il file</html>")
    }else{
        res.send("<html> Attenzione " + req.body.email + " password errata</html>")
    }
});