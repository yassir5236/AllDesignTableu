import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import api from '../axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await api.get('/sanctum/csrf-cookie');
      const res = await api.post('/api/login', { email, password });

      localStorage.setItem('token', res.data.access_token);
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setMessage('Email or password is incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
     

      {/* Login Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-5">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[600px] flex overflow-hidden backdrop-blur-sm bg-white/90">
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
              A powerful, yet easy-to-use application for managing venue geospatial data.
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
            {/* Create Account Button */}
            <div className="absolute top-5 right-5 flex items-center gap-3">
              <span className="text-sm text-gray-600">Don't have an account?</span>
              <Link 
                to="/register" 
                className="border border-gray-300 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded tracking-wide font-medium"
              >
                SIGN UP
              </Link>
            </div>

            {/* Login Form */}
            <div className="max-w-md">
              <h2 className="text-3xl font-normal text-gray-800 mb-2">
                Log into LocusVMS
              </h2>
              <p className="text-sm text-gray-600 mb-10">
                Enter your login details below:
              </p>

              {message && (
                <div className={`mb-5 p-3 rounded text-sm ${message.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
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
                      placeholder="Enter your password..."
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-200"
                      required
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

                {/* Options Row */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-gray-600 hover:text-green-500 transition-colors">
                    Forgot your password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-800 text-white py-3.5 rounded text-sm font-medium tracking-widest hover:bg-green-500 transition-colors duration-200 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}