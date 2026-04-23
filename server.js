const app = require('./src/app');

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`LE SERVEUR DEMARRE SUR CET NUMERO DE PORT: http://localhost:${PORT}`);
})