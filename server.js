const express = require('express');

const app = express();
const PORT = 5000 || process.env.PORT;

app.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`SERVER RUNNING ON PORT ${PORT}`);
})