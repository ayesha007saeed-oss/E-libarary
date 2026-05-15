import React from 'react';
import { auth } from '../firebase';
import { User, Mail, Book } from 'lucide-react';

const Profile = () => {
  const user = auth.currentUser;

  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
      <div className="auth-container" style={{maxWidth: '500px', width: '100%', padding: '40px', background: 'var(--card-bg)', borderRadius: '20px', textAlign: 'center', border: '1px solid var(--border)'}}>
        <div style={{width: '100px', height: '100px', background: 'var(--accent-blue)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <User size={50} color="white" />
        </div>
        <h2>User Profile</h2>
        <div style={{textAlign: 'left', marginTop: '30px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
            <Mail size={20} color="var(--accent-blue)" />
            <span>{user?.email}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Book size={20} color="var(--accent-blue)" />
            <span>Books Read: 12</span>
          </div>
        </div>
        <button onClick={() => auth.signOut()} className="btn-danger" style={{width: '100%', marginTop: '30px'}}>Logout</button>
      </div>
    </div>
  );
};
export default Profile;