import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { BookOpen, Library, User, LogOut, Home } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <BookOpen color="#3b82f6" size={24} />
        <span>E-Lib Reader</span>
      </div>
      <div className="nav-links">
        <Link to="/"><Home size={20} /> <span>Home</span></Link>
        <Link to="/library"><Library size={20} /> <span>Library</span></Link>
        <Link to="/profile"><User size={20} /> <span>Profile</span></Link>
        <button onClick={handleLogout} className="logout-icon"><LogOut size={20} /></button>
      </div>
    </nav>
  );
};

export default Navbar;