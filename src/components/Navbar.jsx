import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 shadow-lg text-white sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-6 py-4 max-w-4xl flex justify-between items-center">
        <Link to="/todos" className="text-xl font-extrabold tracking-tight flex items-center gap-2.5 group">
          <span className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner group-hover:scale-105 transition">
            ✨
          </span>
          <span className="bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
            Taskify Pro
          </span>
        </Link>
        <nav className="flex gap-2 bg-black/10 p-1.5 rounded-2xl backdrop-blur-sm border border-white/10">
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isActive ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:text-white hover:bg-white/10'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add-todo"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isActive ? 'bg-white text-indigo-700 shadow-md' : 'text-indigo-100 hover:text-white hover:bg-white/10'
              }`
            }
          >
            + New Task
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;