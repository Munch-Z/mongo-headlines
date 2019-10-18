import React from "react";

const Comment = ({ commentObj, boolean, booleanValue }) => {
  const { _id, comment } = commentObj;

  function deleteComment(id) {
    fetch(`/api/comments/${id}`, {
      method: "DELETE"
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    boolean(!booleanValue);
  }

  return (
    <>
      <p>{comment}</p>
      <button
        data-id={_id}
        onClick={e => {
          deleteComment(e.target.dataset.id);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default Comment;
