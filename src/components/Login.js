import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ for navigation
import Header from './Header';
import { auth } from '../firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate(); // ✅ initialize navigate
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignInForm) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Signed in successfully");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully");
      }
      navigate('/browse'); // ✅ redirect to browse page after success
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in with Google");
      navigate('/browse'); // ✅ redirect to browse page after success
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="relative h-screen font-netflix">
      <img
        className="absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_small.jpg"
        alt="Netflix Background"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <Header />

      <div className="flex justify-center items-center h-screen">
        <form
          className="z-10 bg-black bg-opacity-75 text-white p-12 rounded-md w-full max-w-md"
          onSubmit={handleEmailPasswordAuth}
        >
          <h1 className="text-3xl font-bold mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full p-3 mb-4 bg-gray-700 rounded text-sm placeholder-gray-400 bg-opacity-20"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or phone number"
            className="w-full p-3 mb-4 bg-gray-700 rounded text-sm placeholder-gray-400 bg-opacity-20"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-6 bg-gray-700 rounded text-sm placeholder-gray-400 bg-opacity-20"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 font-semibold rounded text-base"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mx-40 text-xl">OR</p>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 font-semibold rounded text-base"
              onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>

          <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          <p
            className="text-gray-400 mt-8 text-sm hover:underline hover:cursor-pointer hover:text-cyan-50"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign Up Now."
              : "Already Registered? Sign In Now"}
          </p>

          <p className="text-xs text-gray-400 mt-4 leading-5">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
