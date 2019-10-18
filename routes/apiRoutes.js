const router = require("express").Router();
const { Articles, Comments } = require("../models");
const axios = require("axios");

router.get("/frontpage", (req, res) => {
  axios
    .get(
      "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=XcaNGZKMROZNcpgP9ZpPlCBw1FvmDnHt"
    )
    .then(nytRes => {
      const resArr = nytRes.data.results;
      const docs = [];
      for (let i = 0; i < resArr.length; i++) {
        const { title, abstract, url } = resArr[i];

        docs.push({
          title,
          summary: abstract,
          URL: url
        });
      }

      Articles.find({}).then(data => {
        //Check if unique
        for (let i = 0; i < data.length; i++) {
          const oldTitle = data[i].title;

          for (let j = 0; j < docs.length; j++) {
            const newTitle = docs[j].title;

            if (newTitle === oldTitle) {
              docs.splice(j, 1);
            }
          }
        }

        Articles.insertMany(docs).then(articles => {
          const newArr = data.concat(articles);
          console.log("Articles Arr", newArr);
          res.json(newArr);
        });
      });
    });
});

router
  .route("/comments/:articleid")
  .get((req, res) => {
    const { articleid } = req.params;

    Articles.findById(articleid)
      .populate("comments")
      .then(data => {
        console.log(data);

        res.json(data);
      });
  })
  .post((req, res) => {
    const { articleid } = req.params;
    let commentHolder;

    Comments.create(req.body)
      .then(dbComment => {
        commentHolder = dbComment;
        return Articles.findByIdAndUpdate(
          articleid,
          { $push: { comments: dbComment._id } },
          { new: true }
        );
      })
      .then(dbArticle => {
        res.json(commentHolder);
      });
  })
  .delete((req, res) => {
    const { articleid } = req.params;
    Comments.deleteOne({ _id: articleid }).then(data => {
      console.log(data);
      res.sendStatus(200);
    });
  });

module.exports = router;
