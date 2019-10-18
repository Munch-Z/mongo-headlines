import React, { useEffect, useState } from "react";
import Article from "./Article";

const ArticleWrapper = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/frontpage")
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <>
      <div>
        {articles.map(e => {
          return <Article key={e._id} article={e} />;
        })}
      </div>
    </>
  );
};

export default ArticleWrapper;
