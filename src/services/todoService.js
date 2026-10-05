import axios from 'axios';

const API_URL = 'https://todo-78xi.onrender.com';

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTodoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await axios.post(API_URL, todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${API_URL}/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};