import React from "react";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  const { _id, title, summary, URL, comments } = article;
  console.log(comments);

  return (
    <>
      <h1>{title}</h1>
      <p>{summary}</p>
      <a href={URL}>Full Article Here!</a>
      <Link to={`${_id}/comments`}> Comments! </Link>
    </>
  );
};

export default Article;
