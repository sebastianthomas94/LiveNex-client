import React, { useState } from 'react';

const Chat = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLive, setIsLive] = useState(false);

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const postComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  return (
    <div className="chat-container flex flex-col h-full p-4 border border-gray-300 shadow-lg">
      <div className="live-button mb-4">
        <button onClick={toggleLive} className={`${
          isLive ? 'bg-red-500' : 'bg-green-500'
        } w-24 h-12 rounded-md text-white transition-colors duration-300`}>
          {isLive ? 'End Live' : 'Go Live'}
        </button>
      </div>
      <div className="chat flex-grow">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            {comment}
          </div>
        ))}
      </div>
      <div className="input-container mt-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleNewComment}
        />
        <button onClick={postComment} className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
