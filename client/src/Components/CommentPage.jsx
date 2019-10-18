import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fetchComments, setFetchComments] = useState(false);
  const { articleid } = useParams();
  const commentbox = useRef();

  useEffect(() => {
    fetch(`/api/comments/${articleid}`)
      .then(res => res.json())
      .then(data => {
        setComments(data.comments);
        const { title, summary, URL } = data;
        setArticle({ title, summary, URL });
      });
  }, [fetchComments]);

  useEffect(() => {
    function addComment(comment) {
      commentbox.current.value = "";
      fetch(`/api/comments/${articleid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          comments.push(data);
          setComments(comments);
          setFormSubmitted(false);
        });
    }

    if (formSubmitted) {
      const text = commentbox.current.value;
      console.log(text);
      addComment(text);
    }
  }, [formSubmitted]);

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.summary}</p>
      <a href={article.URL}>Full Article Here!</a>
      {comments.length > 0 ? (
        comments.map(e => {
          return (
            <Comment
              key={e._id}
              commentObj={e}
              boolean={setFetchComments}
              booleanValue={fetchComments}
            />
          );
        })
      ) : (
        <p>No comments yet!</p>
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          setFormSubmitted(true);
        }}
      >
        <input type="text" ref={commentbox} />
        <button>Add Comment</button>
      </form>
    </>
  );
};

export default CommentPage;
