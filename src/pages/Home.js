import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Home = () => {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      if (!auth.currentUser) return;
      const q = query(collection(db, "userProgress"), where("userId", "==", auth.currentUser.uid));
      const snap = await getDocs(q);
      setRecentBooks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchRecentBooks();
  }, []);

  return (
    <div className="container">
      <header style={{ marginBottom: '40px' }}>
        <h1>Welcome to your Dashboard</h1>
        <p style={{ color: 'var(--text-gray)' }}>Pick up right where you left off.</p>
      </header>

      <h2>My Books (Continue Reading)</h2>
      {recentBooks.length === 0 ? (
        <div style={{ background: 'var(--form-bg)', padding: '30px', borderRadius: '15px', textAlign: 'center', marginTop: '20px', border: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-gray)', marginBottom: '15px' }}>You haven't started reading any books yet.</p>
          <Link to="/library"><button className="auth-btn" style={{ width: 'auto', padding: '10px 20px' }}>Browse Library</button></Link>
        </div>
      ) : (
        <div className="book-grid">
          {recentBooks.map(book => (
            <div key={book.id} className="book-card">
              <img src={book.coverimage} alt="cover" />
              <h3>{book.title}</h3>
              <p style={{ color: 'var(--text-gray)' }}>Last Read: Page {book.lastPage}</p>
              <Link to={`/reader/${book.bookId}`}><button className="auth-btn" style={{ marginTop: '10px' }}>Continue</button></Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;