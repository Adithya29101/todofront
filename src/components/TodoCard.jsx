import React from 'react';
import { Link } from 'react-router-dom';

const TodoCard = ({ todo, onDelete, onToggleStatus }) => {
  if (!todo) return null;

  const isCompleted = todo.status === 'Completed';

  return (
    <div className={`group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 ${isCompleted ? 'bg-slate-50/60 border-slate-200' : 'hover:border-indigo-200'}`}>
      <div className="flex items-start gap-4 flex-grow">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleStatus(todo)}
          className="mt-1.5 h-5 w-5 text-indigo-600 rounded-lg border-slate-300 focus:ring-indigo-500 cursor-pointer transition shadow-sm"
        />
        <div>
          <h3 className={`font-bold text-base transition-colors ${isCompleted ? 'line-through text-slate-400' : 'text-slate-800 group-hover:text-indigo-600'}`}>
            {todo.title}
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full text-xs font-bold tracking-wide shadow-xs ${
              isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-amber-50 text-amber-700 border border-amber-200/60'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            {todo.status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        <Link
          to={`/edit-todo/${todo.id}`}
          className="px-4 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl text-xs font-bold tracking-wide uppercase transition border border-slate-200/60 shadow-xs"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-4 py-2 bg-rose-50/80 hover:bg-rose-600 text-rose-700 hover:text-white rounded-xl text-xs font-bold tracking-wide uppercase transition border border-rose-200/60 shadow-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;