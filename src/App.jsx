import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './pages/TodoList';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          <Routes>
            <Route path="/" element={<Navigate to="/todos" replace />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/add-todo" element={<AddTodo />} />
            <Route path="/edit-todo/:id" element={<EditTodo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;