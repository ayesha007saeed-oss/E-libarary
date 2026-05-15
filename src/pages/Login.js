import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) await createUserWithEmailAndPassword(auth, email, password); // [cite: 12]
      else await signInWithEmailAndPassword(auth, email, password);
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-wrapper">
          <h2 style={{textAlign:'center'}}>{isSignup ? "Register" : "Login"}</h2>
          <form onSubmit={handleAuth}>
            <div className="input-group">
              <Mail style={{position:'absolute', left:12, top:12}} size={18} color="#555"/>
              <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <Lock style={{position:'absolute', left:12, top:12}} size={18} color="#555"/>
              <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="auth-btn" style={{width:'100%', padding:12, background:'var(--accent-blue)', color:'white', border:'none', borderRadius:10, cursor:'pointer'}}>
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p onClick={() => setIsSignup(!isSignup)} style={{color:'var(--accent-blue)', textAlign:'center', marginTop:15, cursor:'pointer'}}>
            {isSignup ? "Already have an account? Login" : "New here? Create Account"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;