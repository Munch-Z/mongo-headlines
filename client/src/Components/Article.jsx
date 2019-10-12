import React from 'react';

const Article = ({ article }) => {
    
    const {_id, title, summary, URL} = article;

    return (
        <>
        <h1>{title}</h1>
        <p>{summary}</p>
        <a href={URL}>Full Article Here!</a>
        </>
    )
}

export default Article;