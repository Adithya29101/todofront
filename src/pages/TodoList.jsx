import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TodoCard from '../components/TodoCard';
import { getTodos, deleteTodo, updateTodo } from '../services/todoService';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Is JSON Server running on http://localhost:3000?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteTodo(deleteId);
      setTodos(todos.filter((t) => t && t.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert('Failed to delete todo item.');
    }
  };

  const handleToggleStatus = async (todo) => {
    if (!todo) return;
    const newStatus = todo.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      const updated = await updateTodo(todo.id, { ...todo, status: newStatus });
      setTodos(todos.map((t) => (t && t.id === todo.id ? updated : t)));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const completedCount = todos.filter((t) => t?.status === 'Completed').length;
  const pendingCount = todos.filter((t) => t?.status === 'Pending').length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 p-8 rounded-3xl text-center max-w-md mx-auto my-12 shadow-sm">
        <p className="text-rose-700 font-medium mb-6">{error}</p>
        <button
          onClick={fetchTodos}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold shadow transition"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Stats Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Task Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage, organize, and track your daily productivity.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-100">
              Total: {todos.length}
            </span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-100">
              Done: {completedCount}
            </span>
          </div>
          <Link
            to="/add-todo"
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 transition-all hover:scale-[1.02]"
          >
            + Add Task
          </Link>
        </div>
      </div>

      {/* Task List */}
      {todos.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl text-center border border-slate-100 shadow-sm">
          <div className="text-4xl mb-3">📝</div>
          <h3 className="font-bold text-slate-800 text-lg">No tasks found</h3>
          <p className="text-slate-500 text-sm mt-1 mb-6">Get started by creating your very first task!</p>
          <Link
            to="/add-todo"
            className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow hover:bg-indigo-700 transition"
          >
            Create Task &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3.5">
          {todos.map((todo) => {
            if (!todo) return null;
            return (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDelete={(id) => setDeleteId(id)}
                onToggleStatus={handleToggleStatus}
              />
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex justify-center items-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-xl mb-4 font-bold">
              ⚠️
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Delete Task</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-rose-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;