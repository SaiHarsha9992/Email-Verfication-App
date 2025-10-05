import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Using Link for better navigation

export default function Verify() {
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'

  useEffect(() => {
    const token = window.location.pathname.split("/").pop();

    if (!token) {
        setMessage("Verification token not found in URL.");
        setStatus("error");
        return;
    }

    axios.get(`https://email-verfication-app.onrender.com/api/auth/verify/${token}`)
      .then(res => {
        setMessage(res.data.message || "Email verified successfully!");
        setStatus("success");
      })
      .catch(err => {
        setMessage(err.response?.data?.message || "Invalid or Expired Token. Please try again.");
        setStatus("error");
      });
  }, []);

  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <>
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-green-400">Verification Complete</h2>
            <p className="text-gray-300 text-lg mb-8">{message}</p>
            <Link to="/login" className="w-full max-w-xs mx-auto mt-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 inline-block">
              Proceed to Login
            </Link>
          </>
        );
      case "error":
        return (
          <>
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-red-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-red-400">Verification Failed</h2>
            <p className="text-gray-300 text-lg mb-8">{message}</p>
             <Link to="/signup" className="w-full max-w-xs mx-auto mt-4 bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 inline-block">
              Sign Up Again
            </Link>
          </>
        );
      default: // loading
        return (
          <>
            <svg className="animate-spin h-8 w-8 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl">{message}</p>
          </>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Verification Card */}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 z-10 text-center">
        {renderContent()}
      </div>

      {/* Style block for animations */}
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
