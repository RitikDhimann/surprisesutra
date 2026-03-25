import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { motion } from 'framer-motion';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { USER_API_BASE } from "../config";
import YellowLogo from '../assest/YellowLogo.webp';

const RegisterPage = () => {
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
        <div className="min-h-screen font-brand relative overflow-hidden flex flex-col px-4 md:px-6 pt-28 pb-12 md:pt-32" style={{ background: "linear-gradient(135deg, #fce4f3 0%, #f3e6ff 50%, #fff3e0 100%)" }}>
            {/* Whimsical Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/40 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-pink/20 rounded-full blur-[120px] animate-float-delayed" />

            <div className="w-full max-w-2xl relative z-10 m-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-5 xs:p-8 md:p-16 border-8 border-white shadow-2xl relative overflow-hidden rounded-[3rem] md:rounded-[4rem]"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-6 left-6 md:top-10 md:left-10 p-3 md:p-4 bg-pastel-pink/10 rounded-full text-brand-primary hover:bg-brand-primary hover:text-white transition-all group z-20"
                    >
                        <ArrowLeft size={18} className="md:size-[20px] group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center mb-10 md:mb-12">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="bg-pastel-pink/10 p-5 md:p-6 rounded-2xl md:rounded-[2.5rem] mb-6 md:mb-8 relative"
                        >
                            <img src={YellowLogo} alt="Logo" className="h-16 md:h-20 w-auto relative z-10" />
                            <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl md:rounded-[2.5rem] blur-lg animate-pulse" />
                        </motion.div>
                        <h1 className="text-2xl md:text-4xl font-heading font-black text-brand-brown tracking-tighter mb-4 text-center leading-tight">Join the <span className="text-brand-primary">Party!</span></h1>
                        <p className="text-brand-brown/40 font-bold text-[10px] md:text-sm uppercase tracking-widest text-center px-4">Create your account for more magic and surprises</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6" autoComplete="off" noValidate>
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">Username</label>
                                <div className="relative group">
                                    <User className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Alice"
                                        autoComplete="off"
                                        className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-xs md:text-base"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">Email Addresss </label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="alice@surprise.com"
                                        autoComplete="off"
                                        className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-xs md:text-base"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">Secret Key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className="w-full pl-12 md:pl-16 pr-12 md:pr-16 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-xs md:text-base"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 text-brand-brown/20 hover:text-brand-primary transition-colors">
                                        {showPassword ? <EyeOff size={18} className="md:size-[20px]" /> : <Eye size={18} className="md:size-[20px]" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">Just to be Sure</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className="w-full pl-12 md:pl-16 pr-12 md:pr-16 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-xs md:text-base"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 text-brand-brown/20 hover:text-brand-primary transition-colors">
                                        {showConfirm ? <EyeOff size={18} className="md:size-[20px]" /> : <Eye size={18} className="md:size-[20px]" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            className="w-full btn-bubbly bg-brand-brown text-white font-black py-5 md:py-7 rounded-2xl md:rounded-3xl uppercase tracking-widest text-[9px] md:text-xs border-none shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 mt-6 md:mt-8"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                        <Sparkles size={18} className="md:size-[22px]" />
                                    </motion.div>
                                    <span>SIGN ME UP!</span>
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center mt-12 text-brand-brown/40 font-bold">
                        Already Part of Us? {' '}
                        <Link to="/login" className="text-brand-primary font-black hover:underline px-2 py-1 rounded-lg hover:bg-brand-pink/10 transition-all"> Login</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterPage;