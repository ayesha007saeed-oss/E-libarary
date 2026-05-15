import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Search, Plus, Trash2 } from 'lucide-react'; // Trash2 icon import kiya hai

const Library = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: 'Programming', coverimage: '', fileURL: '' });

  const fetchBooks = async () => {
    const snap = await getDocs(collection(db, "books"));
    setBooks(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "books"), newBook);
    setShowModal(false);
    fetchBooks();
  };

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this book?")) {
      await deleteDoc(doc(db, "books", id));
      fetchBooks();
    }
  };

  const filteredBooks = books.filter(b => 
    (filter === 'All' || b.category === filter) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Library Catalog</h2>
        <button className="auth-btn" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => setShowModal(true)}>
          <Plus size={18} style={{ marginRight: '5px' }}/> Add Book
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '12px', color: 'var(--text-gray)' }}/>
          <input 
            type="text" placeholder="Search title or author..." 
            style={{ width: '100%', padding: '12px 15px 12px 42px', background: 'var(--form-bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', boxSizing: 'border-box' }}
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <div className="filter-bar">
          {['All', 'Programming', 'Fiction', 'Science'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`filter-btn ${filter === cat ? 'active' : ''}`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="book-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.coverimage || 'https://via.placeholder.com/150'} alt="cover" />
            <span style={{ fontSize: '12px', background: 'var(--accent-blue)', padding: '2px 8px', borderRadius: '10px' }}>{book.category}</span>
            <h3 style={{ margin: '10px 0 5px' }}>{book.title}</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '15px' }}>{book.author}</p>
            
            {/* ACTION BUTTONS: READ & DELETE */}
            <div style={{display: 'flex', gap: '10px'}}>
               <Link to={`/reader/${book.id}`} style={{flex: 1, textDecoration: 'none'}}>
                 <button className="auth-btn">Open Reader</button>
               </Link>
               <button onClick={() => handleDelete(book.id)} className="auth-btn" style={{background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', width: 'auto', padding: '10px'}}>
                 <Trash2 size={18} />
               </button>
            </div>

          </div>
        ))}
      </div>

      {/* Admin Upload Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginBottom: '20px' }}>Upload New Book</h2>
            <form onSubmit={handleAddBook}>
              <div className="input-group"><input type="text" placeholder="Book Title" required onChange={e => setNewBook({...newBook, title: e.target.value})} /></div>
              <div className="input-group"><input type="text" placeholder="Author Name" required onChange={e => setNewBook({...newBook, author: e.target.value})} /></div>
              <div className="input-group">
                <select onChange={e => setNewBook({...newBook, category: e.target.value})}>
                  <option>Programming</option><option>Fiction</option><option>Science</option>
                </select>
              </div>
              <div className="input-group"><input type="url" placeholder="Cover Image URL" required onChange={e => setNewBook({...newBook, coverimage: e.target.value})} /></div>
              <div className="input-group"><input type="url" placeholder="PDF File URL" required onChange={e => setNewBook({...newBook, fileURL: e.target.value})} /></div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="auth-btn">Save Book</button>
                <button type="button" className="auth-btn" style={{ background: '#ef4444' }} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Library;