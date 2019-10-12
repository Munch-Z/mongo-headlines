const router = require('express').Router();
const { Articles } = require('../models');
const axios = require('axios');

router.get('/api/frontpage', (req, res) => {
    axios.get('https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=XcaNGZKMROZNcpgP9ZpPlCBw1FvmDnHt')
    .then((nytRes) => {
        
        const resArr = nytRes.data.results;
        const docs = [];
        for (let i = 0; i < resArr.length; i++) {
            const { title, abstract, url } = resArr[i];

            docs.push({
                title,
                summary: abstract,
                URL: url,
            })
        }

        Articles.insertMany(docs)
        .then((docs) => {
            res.json(docs);
        })
    })
})

module.exports = router;