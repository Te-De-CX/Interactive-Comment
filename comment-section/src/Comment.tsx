import React from "react";

const Comment: React.FC = () => {

    const [comments, setComments] = React.useState<string[]>([]);

  return (
    <div>
      <h1>Comment Section</h1>
        <form
            onSubmit={(e) => {
            e.preventDefault();
            const comment = e.currentTarget.comment.value;
            setComments([...comments, comment]);
            e.currentTarget.comment.value = "";
            }}
        >
            <input type="text" name="comment" />
            <button type="submit">Submit</button>
        </form>
        <ul>
            {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
            ))}
        </ul>
    </div>
  );
};
export default Comment;