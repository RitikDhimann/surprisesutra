import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowLeft } from "lucide-react";
import { motion } from 'framer-motion';
import axios from "axios";
import { toast } from 'react-toastify';
import { USER_API_BASE } from "../config";
import AuthSideImage from '../assets/A (3).jpg';
import Logo from '../assets/surprisesutralogopng.webp';

const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            toast.error("Please fill all fields!");
            return;
        }
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        setLoading(true);

        try {
            const { data } = await axios.post(`${USER_API_BASE}/register`, {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            toast.success(`Welcome aboard, ${data.user.name}!`);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Magic failed! Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-jakarta flex overflow-hidden bg-brand-cream selection:bg-brand-primary/20">
            {/* Left Panel: Form */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center p-6 md:p-12 bg-white/50 backdrop-blur-xl">
                {/* Background Blobs */}
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-brown/5 rounded-full blur-[80px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-lg relative z-10"
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

                    <div className="mb-8 text-center">
                        <img src={Logo} alt="Logo" className="h-10 md:h-12 w-auto mb-6 mx-auto" />
                        <h1 className="text-4xl md:text-5xl font-brand font-black text-brand-brown tracking-tighter leading-tight">
                            Welcome to the <span className="text-brand-primary italic">Party!</span>
                        </h1>
                        <p className="text-brand-brown/40 font-medium text-xs md:text-sm uppercase tracking-[0.3em] font-jakarta mt-4">
                            Create your account for more magic and surprises
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5" autoComplete="off">
                        {/* ... (rest of form) */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-brown/40 ml-2">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[20px]" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Alice"
                                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-brand-brown/5 focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all font-bold text-brand-brown text-base shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-brown/40 ml-2">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[20px]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="alice@surprise.com"
                                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-brand-brown/5 focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all font-bold text-brand-brown text-base shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-brown/40 ml-2">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[20px]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white border-2 border-brand-brown/5 focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all font-bold text-brand-brown text-base shadow-sm"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-brown/20 hover:text-brand-primary transition-colors">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-brown/40 ml-2">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[20px]" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white border-2 border-brand-brown/5 focus:border-brand-primary/30 focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all font-bold text-brand-brown text-base shadow-sm"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-brown/20 hover:text-brand-primary transition-colors">
                                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-brown hover:bg-brand-brown/95 text-white font-black py-5 rounded-3xl uppercase tracking-widest text-xs border-none shadow-[0_20px_40px_-10px_rgba(45,35,30,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 mt-4 transition-all hover:shadow-[0_25px_50px_-12px_rgba(45,35,30,0.4)]"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    <span>Sign Me Up!</span>
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center mt-10 text-brand-brown/40 font-bold text-sm">
                        Already have an account? {' '}
                        <Link to="/login" className="text-brand-primary font-black hover:underline transition-all underline-offset-4">
                            Log In
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Panel: Branded Image (Desktop Only) */}
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
                        <h2 className="text-4xl xl:text-6xl font-brand font-black text-brand-secondary mb-6 leading-tight tracking-tighter text-right">
                            Creating <span className="text-brand-primary italic">Magic</span> <br />
                            <span className="text-brand-secondary italic">One Surprise</span> at a Time.
                        </h2>
                        <p className="text-white/70 text-lg font-light max-w-md leading-relaxed text-right ml-auto tracking-wide">
                            Every milestone deserves a touch of extraordinary. Join us in making memories that last forever.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;