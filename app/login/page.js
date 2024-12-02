"use client"
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams()
    const nextParam = searchParams.get('next')
    const next = nextParam || '/';

    useEffect(() => {
        console.log(next, session)
        if (session) {
            router.push(next || '/');
        }
    }, [session]);

    const handleInputChange = () => {
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            redirect: false,
            username,
            password,
            callbackUrl: next,
        });

        if (!res.ok) {
            if (res.error == 'CredentialsSignin')
                setError("Invalid Username or Password");
        } else {
            await router.push(next || '/');
            toast.success('Login Successful!');
        }
    };

    return (
        <div className="space-y-4 m-lg-4 m-12">
            <div className="bg-white">
                <div className="flex justify-center">
                    <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)' }}>
                        <div className="flex items-center h-full px-20 bg-zinc-900 bg-opacity-40">

                        </div>
                    </div>
                    <div className="flex items-center w-full max-w-md px-6 py-16 mx-auto lg:w-2/4">
                        <div className="flex-1">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-center text-zinc-700">MockMate</h2>
                                <p className="mt-3 text-zinc-500">Sign in to access your account</p>
                            </div>
                            <div className="mt-8">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm text-zinc-600">Username</label>
                                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onFocus={handleInputChange} placeholder="Your Username" className="block w-full px-4 py-2 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password" className="text-sm text-zinc-6000">Password</label>
                                            <a href="#" className="text-sm text-zinc-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                        </div>
                                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={handleInputChange} placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="mt-6">
                                        {error && <p className="text-red-500">{error}</p>}
                                    </div>
                                    <div className="mt-6">
                                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">Sign in</button>
                                        <p className='my-3 text-center'>Or</p>
                                        <button
                                            onClick={() => signIn('google')}
                                            className="w-full my-3 bg-transparent hover:bg-orange-500 text-blue-700 hover:text-white mx-auto px-4 border border-blue-500 hover:border-transparent rounded transition duration-200 flex items-center justify-center"
                                        >
                                            <span className="px-3 py-3 me-4 bg-white">
                                                <svg className="w-5 h-5" viewBox="0 0 48 48">
                                                    <path fill="#4285F4" d="M24 9.5c3.1 0 5.6 1.1 7.5 2.9l5.6-5.6C33.4 3.5 28.9 1.5 24 1.5 14.8 1.5 7.2 7.8 4.7 16.1l6.9 5.4C13.2 14.3 18.1 9.5 24 9.5z" />
                                                    <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.4 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.6z" />
                                                    <path fill="#FBBC05" d="M10.2 28.5c-1.1-3-1.1-6.3 0-9.3l-6.9-5.4C.5 18.1 0 21 0 24s.5 5.9 1.4 8.6l6.8-5.4z" />
                                                    <path fill="#EA4335" d="M24 46.5c5.9 0 10.8-2 14.4-5.4l-7.6-5.9c-2.1 1.4-4.7 2.2-7.4 2.2-5.9 0-10.8-4.8-11.9-10.9l-6.9 5.4C7.2 40.2 14.8 46.5 24 46.5z" />
                                                    <path fill="none" d="M0 0h48v48H0z" />
                                                </svg>
                                            </span>
                                            Login with Google
                                        </button>
                                    </div>
                                </form>
                                <p className="mt-6 text-sm text-center text-zinc-400">Don&apos;t have an account yet? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
