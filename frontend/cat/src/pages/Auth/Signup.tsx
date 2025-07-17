import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const nav = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Enter a valid email address');
      return;
    }

    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      toast.error('Password must be 8+ characters & include a symbol');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.ok) {
        toast.success('Registration successful!');
        localStorage.setItem('registrationSuccess', 'true');
        nav('/auth/signin');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1b1b1b] border border-yellow-500 rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-2">
          Create Your Operator Account
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Gain access to tools, tasks, and training.
        </p>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-yellow-500">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
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
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <span
            onClick={() => nav('/auth/signin')}
            className="text-yellow-500 font-medium cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
