import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

import { USER_API_BASE } from "../config";
import YellowLogo from '../assest/YellowLogo.webp';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
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
        <div className="min-h-screen font-brand relative overflow-hidden flex flex-col px-4 md:px-6 pt-28 pb-12 md:pt-32" style={{ background: "linear-gradient(135deg, #fce4f3 0%, #f3e6ff 50%, #fff3e0 100%)" }}>
            {/* Whimsical Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/40 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-pink/20 rounded-full blur-[120px] animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pastel-yellow/10 rounded-full blur-[150px]" />

            <div className="w-full max-w-xl relative z-10 m-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-5 xs:p-8 md:p-16 border-8 border-white shadow-2xl relative overflow-hidden rounded-[3rem] md:rounded-[4rem]"
                >
                    {/* Floating Shapes in Card */}
                    <div className="absolute top-10 right-10 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl animate-float" />

                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-6 left-6 md:top-10 md:left-10 p-3 md:p-4 bg-pastel-pink/10 rounded-full text-brand-primary hover:bg-brand-primary hover:text-white transition-all group z-20"
                    >
                        <ArrowLeft size={18} className="md:size-[20px] group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center mb-10 md:mb-12">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="bg-pastel-pink/10 p-5 md:p-6 rounded-2xl md:rounded-[2.5rem] mb-6 md:mb-8 relative"
                        >
                            <img src={YellowLogo} alt="Logo" className="h-16 md:h-20 w-auto relative z-10" />
                            <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl md:rounded-[2.5rem] blur-lg animate-pulse" />
                        </motion.div>
                        <h1 className="text-2xl md:text-4xl font-heading font-black text-brand-brown tracking-tighter mb-4 text-center leading-tight">Welcome <span className="text-brand-primary">Back!</span></h1>
                        <p className="text-brand-brown/40 font-bold text-[10px] md:text-sm uppercase tracking-widest text-center px-4">Enter your details to rejoin the Surprise</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6" autoComplete="off" noValidate>
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">Email Bit</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="yourname@sparkle.com"
                                    autoComplete="off"
                                    className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-xs md:text-base"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">Surprise SutraKey</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    className="w-full pl-12 md:pl-16 pr-12 md:pr-16 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-xs md:text-base"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 text-brand-brown/20 hover:text-brand-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} className="md:size-[20px]" /> : <Eye size={18} className="md:size-[20px]" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end px-4">
                            <Link to="/forgot-password" size={22} className="text-brand-brown/60 font-black text-sm hover:text-brand-primary tracking-tight">Forgot Surprise Sutra Key?</Link>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            className="w-full btn-bubbly bg-brand-brown text-white font-black py-5 md:py-6 rounded-2xl md:rounded-3xl uppercase tracking-widest text-[9px] md:text-xs border-none shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Sparkles size={18} className="md:size-[20px]" />
                                    <span>Login Now</span>
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center mt-12 text-brand-brown/40 font-bold">
                        New to Propz? {' '}
                        <Link to="/register" className="text-brand-primary font-black hover:underline px-2 py-1 rounded-lg hover:bg-brand-pink/10 transition-all">Sign up now</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;