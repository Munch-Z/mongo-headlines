import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'
import Comment from './Comment';

const CommentPage = () => {
    const [comments, setComments] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false)
    const { articleid } = useParams();
    const commentbox = useRef();
  

    useEffect(() => {
    
        fetch(`/api/comments/${articleid}`)
        .then(res => res.json())
        .then(data => setComments(data.comments))
    }, [])

    useEffect(() => {
        
        function addComment(comment) {
            commentbox.current.value = '';
            console.log(JSON.stringify(comment));
            fetch(`/api/comments/${articleid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({comment})
            })
            .then(res => res.json())
            .then(data => {
                comments.push(data);
                setComments(comments);
                setFormSubmitted(false);
            })
        }

        if (formSubmitted) {
            const text = commentbox.current.value;
            console.log(text);
            addComment(text);
        }

    }, [formSubmitted])

    return(
        <>
        {comments.length > 0 ? 
        comments.map((e) => {
            return <Comment key={e._id} commentObj={e} />
        }) :
        <p>No comments yet!</p>
        }
        <form onSubmit={(e) => {
            e.preventDefault();
            setFormSubmitted(true)
        }}>
        <input type="text" ref={commentbox}/>
        <button>Add Comment</button>
        </form>
        </>
    )
    
}

export default CommentPage;