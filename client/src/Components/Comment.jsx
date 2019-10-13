import React from 'react';

const Comment = ({ commentObj }) => {
    const { _id, comment } = commentObj;

    return(
        <>
        <p>{comment}</p>
        <button data-id={_id} onClick={(e) => {
            e.target.dataset.id
        }}>Delete</button>
        </>
    )
}

export default Comment;