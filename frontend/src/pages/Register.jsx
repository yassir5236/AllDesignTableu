import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import api from '../axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();
  
  if (password !== confirmPassword) {
    setMessage('Passwords do not match');
    return;
  }

  setIsLoading(true);
  setMessage('');

  try {
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/register', { 
      name, 
      email, 
      password,
      password_confirmation: confirmPassword 
    });

    // Store the token if it exists in response
    if (res.data.access_token) {
      localStorage.setItem('token', res.data.access_token);
      setMessage('Registration successful!');
      navigate('/dashboard');
    } else {
      setMessage('Registration successful! Please login.');
      navigate('/login');
    }
  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || 'Registration failed');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen  flex items-center justify-center p-5">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[600px] flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-2/5 bg-gradient-to-br from-slate-600 to-slate-800 flex flex-col items-center justify-center text-center p-10 relative">
          {/* Logo */}
          <div className="w-20 h-20 bg-green-500 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-green-500/30">
            <div className="w-10 h-10 bg-white rounded relative">
              <div className="absolute top-2 left-2 w-6 h-6 border-3 border-green-500 rounded-sm"></div>
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
            LocusVMS
          </h1>

          {/* Tagline */}
          <p className="text-sm text-slate-300 mb-10 tracking-wide">
            Venue Management System
          </p>

          {/* Description */}
          <p className="text-base text-slate-300 leading-relaxed max-w-xs">
            Join our platform to manage venue geospatial data efficiently.
          </p>

          {/* Version */}
          <div className="absolute bottom-5 left-5 text-xs text-slate-400">
            Version 2.1
          </div>

          {/* Copyright */}
          <div className="absolute bottom-5 right-5 text-xs text-slate-400">
            Copyright © 2018 - LocusLabs, Inc.
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-3/5 p-12 flex flex-col justify-center relative">
          {/* Login Button */}
          <div className="absolute top-5 right-5 flex items-center gap-3">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link 
              to="/login" 
              className="border border-gray-300 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded tracking-wide font-medium"
            >
              SIGN IN
            </Link>
          </div>

          {/* Register Form */}
          <div className="max-w-md">
            <h2 className="text-3xl font-normal text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-sm text-gray-600 mb-10">
              Fill in your details to get started:
            </p>

            {message && (
              <div className={`mb-5 p-3 rounded text-sm ${message.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs text-gray-600 mb-2 tracking-wide font-medium">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs text-gray-600 mb-2 tracking-wide font-medium">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs text-gray-600 mb-2 tracking-wide font-medium">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-200"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs text-gray-600 mb-2 tracking-wide font-medium">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-800 text-white py-3.5 rounded text-sm font-medium tracking-widest hover:bg-green-500 transition-colors duration-200 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}