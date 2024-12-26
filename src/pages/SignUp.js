import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    

    const handleSubmit = async (email, password) => {
        setError('');

        if(password !== confirmPassword) {
            setError("passwords don't match");
            return;
        }

        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log("User signed up:", user);
          // Handle successful signup and redirect to dashboard

        } catch (error) {
          console.error("Error signing up:", error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log("User signed in with Google:", user);
          // Handle successful signup
        } catch (error) {
          console.error("Error signing in with Google:", error.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-20 flex items-center justify-center mb-24">
            <div className="bg-slate-200 rounded-lg space-y-4 pt-8 px-8 py-8">
                <h1 className="text-[24px] font-poppins font-bold mb-4 text-center">
                    Sign up
                </h1>
                <p className="text-[12px] font-poppins text-center text-wrap pb-4">
                    Welcome! Sign up below:
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <input 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-transparent w-full outline-none"
                            required
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                        <input 
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent w-full outline-none"
                            required
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent w-full outline-none"
                            required
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            value={password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-transparent w-full outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-300 transition-colors"
                        onClick={handleSubmit}
                    >
                        Sign up
                    </button>

                    <div className="py-2 text-center">
                        Or
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-300 transition-colors"
                        onClick={handleGoogleSignIn}
                    >
                        Sign in with Google
                    </button>
                </form>

                <div mt-6 text-center text-sm>
                    <span className="text-gray-300">
                        Already have an account? 
                    </span>{' '}
                    <Link to="/login" className='text-blue-600 hover:underline'>
                        Login
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default SignUp;