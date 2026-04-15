import {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

import { USER_API_BASE } from "../config";
import AuthSideImage from '../assets/A (3).jpg';
import Logo from '../assets/surprisesutralogopng.webp';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${USER_API_BASE}/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                toast.success('Successfully logged in!');


                setTimeout(() => {
                    navigate("/");
                }, 3500);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-jakarta flex overflow-hidden bg-brand-cream selection:bg-brand-primary/20">
            {/* Left Panel: Branded Image (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
                <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={AuthSideImage} 
                    alt="Luxury Event Decor" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] ease-linear"
                />
                
                {/* Elegant Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/40 to-transparent flex flex-col justify-end p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h2 className="text-4xl xl:text-6xl font-brand font-black text-brand-secondary mb-6 leading-tight tracking-tighter">
                            Creating <span className="text-brand-secondary italic">Magic</span> <br />
                            <span className="text-brand-primary italic">One Surprise</span> at a Time.
                        </h2>
                        <p className="text-white/70 text-lg font-light max-w-md leading-relaxed tracking-wide">
                            Join our community of dreamers and let's craft unforgettable moments together.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative floating element */}
                <div className="absolute top-12 left-12">
                   <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group/back">
                        <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover/back:bg-brand-primary/50 group-hover/back:border-brand-primary transition-all">
                            <ArrowLeft size={20} />
                        </div>
                   </Link>
                </div>
            </div>

            {/* Right Panel: Form */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center p-6 md:p-12 bg-white/50 backdrop-blur-xl">
                {/* Background Blobs for Mobile/Design depth */}
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-brown/5 rounded-full blur-[80px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Back Button for Mobile */}
                    <div className="lg:hidden mb-8">
                         <button
                            onClick={() => navigate('/')}
                            className="p-3 bg-brand-primary/10 rounded-full text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    </div>

                    <div className="mb-10 text-center">
                        <img src={Logo} alt="Logo" className="h-10 md:h-12 w-auto mb-6 mx-auto" />
                        <h1 className="text-4xl md:text-5xl font-brand font-black text-brand-brown tracking-tighter leading-tight">
                            Welcome <span className="text-brand-primary italic">Back!</span>
                        </h1>
                        <p className="text-brand-brown/40 font-medium text-xs md:text-sm uppercase tracking-[0.3em] font-jakarta mt-4">
                            Enter your details to rejoin the magic
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-brown/40 ml-2">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[20px]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="yourname@sparkle.com"
                                    className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white border-2 border-brand-brown/5 focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all font-bold text-brand-brown text-base shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-brown/40 ml-2">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[20px]" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-16 py-5 rounded-3xl bg-white border-2 border-brand-brown/5 focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all font-bold text-brand-brown text-base shadow-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-brown/20 hover:text-brand-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Link to="/forgot-password" size={22} className="text-brand-brown/60 font-black text-sm hover:text-brand-primary tracking-tight transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-brown hover:bg-brand-brown/95 text-white font-black py-5 rounded-3xl uppercase tracking-widest text-xs border-none shadow-[0_20px_40px_-10px_rgba(45,35,30,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 transition-all hover:shadow-[0_25px_50px_-12px_rgba(45,35,30,0.4)]"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    <span>Sign In Now</span>
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center mt-12 text-brand-brown/40 font-bold text-sm">
                        New to Prop? {' '}
                        <Link to="/register" className="text-brand-primary font-black hover:underline transition-all underline-offset-4">
                            Create an account
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;