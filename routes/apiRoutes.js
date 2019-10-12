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

        Articles.find({})
        .then(data => {
            
            //Check if unique
            for (let i=0; i < data.length; i++) {
                const oldTitle = data[i].title;

                for (let j=0; j < docs.length; j++) {
                    const newTitle = docs[j].title;

                    if(newTitle === oldTitle) {
                        docs.splice(j, 1);
                    }
                }
            }
            console.log('\n\n\n\n-------------Docs:-------------\n\n\n\n ', docs)
            Articles.insertMany(docs)
            .then((articles) => {
                const newArr = data.concat(articles)
                res.json(newArr);
            })
        })
        })


})

module.exports = router;