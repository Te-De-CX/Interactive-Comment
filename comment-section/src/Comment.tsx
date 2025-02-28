import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
  user: string;
  date: string;
  replies?: Comment[];
  color: string; // Text color for the comment and its replies
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Function to add a new comment
  const addComment = () => {
    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: Date.now(),
      text: newComment,
      user: "You",
      date: new Date().toLocaleDateString(),
      color: "text-black", // Default color for top-level comments
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  // Function to add a reply to a comment
  const addReply = (parentId: number, replyText: string, color: string) => {
    if (replyText.trim() === "") return;

    const reply: Comment = {
      id: Date.now(),
      text: replyText,
      user: "You",
      date: new Date().toLocaleDateString(),
      color: color, // Inherit the parent's text color
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  // Recursive component to render comments and their replies
  const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    return (
      <div className={`pl-6 border-l-2 border-gray-200 ${comment.color}`}>
        <div className="p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="font-bold">{comment.user}</div>
          <div className="text-sm text-gray-500">{comment.date}</div>
          <p className="mt-2">{comment.text}</p>
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Reply
          </button>
          {isReplying && (
            <div className="mt-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  addReply(comment.id, replyText, comment.color);
                  setReplyText("");
                  setIsReplying(false);
                }}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Submit Reply
              </button>
            </div>
          )}
        </div>
        {comment.replies && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Comment Section</h1>
      <div className="max-w-2xl mx-auto">
        {/* General Comment Input */}
        <div className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addComment}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Add Comment
          </button>
        </div>

        {/* Display Comments */}
        <div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;