import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // State to track password validation criteria
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // --- Helper component for criteria list items ---
  const CriteriaItem = ({ text, met }) => (
    <li className={`flex items-center transition-colors duration-300 ${met ? 'text-green-400' : 'text-gray-400'}`}>
      {met ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
      )}
      <span className="ml-2">{text}</span>
    </li>
  );

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[\W_]/.test(password), // Checks for non-alphanumeric characters
    };
    setPasswordCriteria(criteria);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setMsg("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }

    // Check if all password criteria are met before submitting
    const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
    if (!allCriteriaMet) {
        setMsg("Please ensure your password meets all the criteria.");
        setIsSuccess(false);
        return;
    }

    setLoading(true);
    setMsg("");
    setIsSuccess(false);

    try {
      const res = await axios.post("https://email-verfication-app.onrender.com/api/auth/signup", form);
      setMsg(res.data.message + " Redirecting to login...");
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred during signup.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [e.target.name]: value });

    // Validate password in real-time
    if (name === "password") {
      validatePassword(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 z-10">
        <h2 className="text-4xl font-bold text-center mb-2 tracking-wider">Create Account</h2>
        <p className="text-center text-gray-300 mb-8">Join us and shape the future</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full bg-gray-800/50 text-white rounded-lg py-3 pl-10 pr-4 border border-transparent focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition duration-300"
            />
          </div>
        
          {/* Email Input */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full bg-gray-800/50 text-white rounded-lg py-3 pl-10 pr-4 border border-transparent focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition duration-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
             <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              className="w-full bg-gray-800/50 text-white rounded-lg py-3 pl-10 pr-4 border border-transparent focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition duration-300"
            />
          </div>
          
          {/* Password Criteria Box */}
          {isPasswordFocused && (
            <div className="p-4 bg-gray-800/60 rounded-lg text-sm space-y-2 transition-all duration-300">
                <ul className="space-y-1">
                    <CriteriaItem text="At least 8 characters" met={passwordCriteria.length} />
                    <CriteriaItem text="A lowercase letter (a-z)" met={passwordCriteria.lowercase} />
                    <CriteriaItem text="An uppercase letter (A-Z)" met={passwordCriteria.uppercase} />
                    <CriteriaItem text="A number (0-9)" met={passwordCriteria.number} />
                    <CriteriaItem text="A special character (!@#...)" met={passwordCriteria.specialChar} />
                </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : "Create Account"}
          </button>
        </form>

        {/* Message Area */}
        {msg && (
          <p className={`mt-6 text-center text-sm font-medium ${isSuccess ? 'text-green-400' : 'text-red-400'} transition-all duration-300`}>
            {msg}
          </p>
        )}

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition">
            Log In
          </Link>
        </p>
      </div>
      
      {/* Style block for the animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

