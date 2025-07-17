import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const nav = useNavigate();
  const [loading, setLoading] = useState(true); // at top


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials:'include'
      });

      const data = await res.json();

      if (data.ok) {
        toast.success('Login successful!');
        localStorage.setItem('token', data.token); // assuming token is returned
        localStorage.setItem('loginStartTime', Date.now().toString()); // 👈 Add this
        nav('/safetycheck',{ replace: true });
      }else{
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Try again.');
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/getuser`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok && data.user) {
          nav('/dashboard'); // 🔁 Redirect to dashboard
        }
        else{
          setLoading(false);
        }
      } catch (err) {
        console.error('Not logged in');
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [nav]);



  if (loading) {
  return <div className="text-white text-center mt-20">Checking session...</div>;
  }


  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1b1b1b] border border-yellow-500 rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-2">
          Operator Login
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Sign in to manage your tasks and tools.
        </p>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-yellow-500">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-yellow-500">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-xl transition-all duration-200"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <span
            onClick={() => nav('/auth/signup')}
            className="text-yellow-500 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
