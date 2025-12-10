'use client'; // Add this for Next.js client component

import React, { useState } from 'react';

// Move the interface outside the component
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface AuthFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthFormProps {
  isLogin: boolean;
  formData: AuthFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
}

// Separate AuthForm component
const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  formData,
  onInputChange,
  onSubmit,
  onToggleMode
}) => {
  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      
      <form onSubmit={onSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={onInputChange}
              placeholder="Enter username"
              required={!isLogin}
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="Enter email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onInputChange}
            placeholder="Enter password"
            required
          />
        </div>
        
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onInputChange}
              placeholder="Confirm password"
              required={!isLogin}
            />
          </div>
        )}
        
        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <div className="toggle-mode">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={onToggleMode} className="toggle-btn">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Main LoginPage component
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'demo', email: 'demo@example.com', password: 'demo123' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const handleLogin = () => {
    const { email, password } = formData;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      alert(`Welcome back, ${user.username}!`);
      resetForm();
    } else {
      alert('Invalid email or password');
    }
  };

  const handleSignup = () => {
    const { username, email, password, confirmPassword } = formData;
    
    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    const userExists = users.some(u => u.email === email);
    
    if (userExists) {
      alert('User with this email already exists');
      return;
    }
    
    const newUser: User = {
      id: users.length + 1,
      username,
      email,
      password
    };
    
    setUsers([...users, newUser]);
    setIsAuthenticated(true);
    setCurrentUser(newUser);
    alert('Account created successfully!');
    resetForm();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    alert('Logged out successfully');
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (isAuthenticated && currentUser) {
    return (
      <div className="app-container">
        <div className="auth-container">
          <h2>Welcome, {currentUser.username}!</h2>
          <p>Email: {currentUser.email}</p>
          <button onClick={handleLogout} className="submit-btn">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <AuthForm
        isLogin={isLogin}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onToggleMode={toggleMode}
      />
      
      {isLogin && (
        <div className="demo-credentials">
          <p>Demo credentials:</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123</p>
        </div>
      )}
    </div>
  );
}