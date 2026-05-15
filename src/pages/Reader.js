import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Reader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const bookSnap = await getDoc(doc(db, "books", bookId));
      if (bookSnap.exists()) {
        setBook(bookSnap.data());
      }
    };
    loadBook();
  }, [bookId]);

  if (!book) return <div className="container" style={{textAlign: 'center', marginTop: '50px'}}>Loading PDF...</div>;

  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      
      {/* Top Toolbar */}
      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', background: 'var(--form-bg)', padding: '15px 25px', borderRadius: '15px', border: '1px solid var(--border)' }}>
        <button onClick={() => navigate('/library')} className="auth-btn" style={{ padding: '8px 15px', width: 'auto', background: '#333' }}>Back to Library</button>
        <h3 style={{ margin: 0, alignSelf: 'center', color: 'white' }}>{book.title}</h3>
      </div>

      {/* Native Browser PDF Reader (No library needed!) */}
      <div style={{ width: '100%', maxWidth: '1000px', height: '80vh', border: '1px solid #333', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
        {book.fileURL ? (
          <iframe 
            src={`${book.fileURL}#toolbar=1`} 
            width="100%" 
            height="100%" 
            style={{ border: 'none' }} 
            title="PDF Reader" 
          />
        ) : (
          <p style={{color: 'black', padding: '50px', textAlign: 'center'}}>No PDF URL provided.</p>
        )}
      </div>
    </div>
  );
};
export default Reader;