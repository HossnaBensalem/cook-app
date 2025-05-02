import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async (recipeId) => {
    try {
      const response = await axios.get(`http://localhost:3001/comments?recipeId=${recipeId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (comment) => {
    try {
      const response = await axios.post('http://localhost:3001/comments', {
        ...comment,
        createdAt: new Date().toISOString()
      });
      setComments(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/comments/${commentId}`);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => useContext(CommentContext);