import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodoById, updateTodo } from '../services/todoService';

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const data = await getTodoById(id);
        setTitle(data.title);
        setStatus(data.status);
        setError(null);
      } catch (err) {
        setError('Failed to fetch todo details.');
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      await updateTodo(id, { title: title.trim(), status });
      navigate('/todos');
    } catch (err) {
      setError('Failed to update todo item.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-500 font-medium">Loading task...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit To-Do</h1>

      {error && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-700 text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/todos')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow transition disabled:opacity-50"
          >
            {submitting ? 'Updating...' : 'Update Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;