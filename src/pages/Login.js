import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            await setDoc(doc(db, 'users', user.uid), {
                email: email,
                createdAt: new Date()
            });

            console.log('Log in successful');
        } catch (error) {
            setError('Failed to log in');
            console.log('Failed to log in');
        }
    }

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: new Date()
            }, { merge: true });

            console.log('Google sign-in successful');
            //navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            setError('Failed to sign in with Google: ' + error.message);
            console.log('Failed to sign in with Google:', error);
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-20 flex items-center justify-center">
            <div className="bg-slate-200 rounded-lg space-y-4 pt-8 px-8 py-8">
                <h1 className="text-[24px] font-poppins font-bold text-center">
                    Login
                </h1>
                <p className="text-[12px] font-poppins text-center text-wrap pb-4">
                    Welcome back! Choose an option to sign in.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <input 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent w-full outline-none"
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent w-full outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-300 transition-colors"
                    >
                        Login
                    </button>

                    <div className="py-2 text-center">
                        Or
                    </div>

                    <button
                        type="submit"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-300 transition-colors"
                        
                    >
                        Sign in with Google
                    </button>
                

                </form>

        

                <div mt-6 text-center text-sm>
                    <span className="text-gray-500">
                        Don't have an account? 
                    </span>{' '}
                    <Link to="/signup" className='text-blue-600 hover:underline'>
                        Sign up
                    </Link>
                </div>
                
            </div>
            
        </div>
    );
};

export default Login;