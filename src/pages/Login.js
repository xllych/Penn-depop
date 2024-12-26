import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await Login(email, password);
            console.log('Log in successful');
        } catch (error) {
            //setError('Failed to log in');
            console.log('Failed to log in');
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-20 flex items-center justify-center">
            <div className="bg-slate-200 rounded-lg space-y-4 pt-8 px-8 py-8">
                <h1 className="text-[24px] font-poppins font-bold mb-4 text-center">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <input 
                            type="text"
                            placeholder="Username"
                            //value={username}
                            className="bg-transparent w-full outline-none"
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                        <input 
                            type="password"
                            placeholder="Password"
                            //value={password}
                            className="bg-transparent w-full outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-300 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <div mt-6 text-center text-sm>
                    <span className="text-gray-300">
                        Don't have an account? 
                    </span>{' '}
                    <Link to="/" className='text-blue-600 hover:underline'>
                        Sign up
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default Login;