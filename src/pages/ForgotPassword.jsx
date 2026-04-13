import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Sparkles, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import YellowLogo from '../assets/YellowLogo.webp';
import axios from 'axios';
import { USER_API_BASE } from "../config";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // 1 = Email, 2 = New Password Form
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Step 1: Check Email
    const handleCheckEmail = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error('Please fill your email');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${USER_API_BASE}/check-email`, { email });
            setStep(2);
            toast.success('Email verified! Create your new magic key.');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Email not found in our magical records.');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            toast.error('Please fill all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${USER_API_BASE}/reset-password`, { email, password: newPassword });
            toast.success('Magic key updated successfully! Please login.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-brand relative overflow-hidden flex flex-col px-4 md:px-6 pt-28 pb-12 md:pt-32" style={{background: "linear-gradient(135deg, #fffbeb 0%, #fff3e0 50%, #fef2f2 100%)"}}>
            
            {/* Whimsical Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/40 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#c73020]/10 rounded-full blur-[120px] animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#fdd825]/10 rounded-full blur-[150px]" />

            <div className="w-full max-w-xl relative z-10 m-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={step}
                    className="bg-white p-5 xs:p-8 md:p-16 border-8 border-white shadow-2xl relative overflow-hidden rounded-[3rem] md:rounded-[4rem]"
                >
                    {/* Floating Shapes in Card */}
                    <div className="absolute top-10 right-10 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl animate-float" />
                    
                    <button 
                        onClick={() => step === 1 ? navigate('/login') : setStep(1)}
                        className="absolute top-6 left-6 md:top-10 md:left-10 p-3 md:p-4 bg-[#fdd825]/10 rounded-full text-[#c73020] hover:bg-[#c73020] hover:text-white transition-all group z-20"
                    >
                        <ArrowLeft size={18} className="md:size-[20px] group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center mb-10 md:mb-12 mt-12 md:mt-0">
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="bg-[#fdd825]/20 p-5 md:p-6 rounded-2xl md:rounded-[2.5rem] mb-6 md:mb-8 relative"
                        >
                            <img src={YellowLogo} alt="Logo" className="h-16 md:h-20 w-auto relative z-10" />
                            <div className="absolute inset-0 bg-[#c73020]/10 rounded-2xl md:rounded-[2.5rem] blur-lg animate-pulse" />
                        </motion.div>
                        <h1 className="text-2xl md:text-4xl font-heading font-black text-brand-brown tracking-tighter mb-4 text-center leading-tight">
                            {step === 1 ? <>Reset <span className="text-[#c73020]">Password</span></> : <>New <span className="text-[#c73020]">Password</span></>}
                        </h1>
                        <p className="text-brand-brown/40 font-bold text-[10px] md:text-sm uppercase tracking-widest text-center px-4">
                            {step === 1 ? "Enter your email to verify your identity" : "Enter a strong password for your account"}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.form 
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleCheckEmail} 
                                className="space-y-6" 
                                autoComplete="off"
                            >
                                <div className="space-y-2">
                                     <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">Email Address</label>
                                     <div className="relative group">
                                         <Mail className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="yourname@sparkle.com"
                                            autoComplete="off"
                                            className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-base"
                                        />
                                     </div>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-bubbly bg-brand-brown text-white font-black py-5 md:py-6 rounded-2xl md:rounded-3xl uppercase tracking-widest text-[9px] md:text-xs border-none shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <> <Sparkles size={18} className="md:size-[20px]" /> <span>VERIFY EMAIL</span> </>}
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.form 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleResetPassword} 
                                className="space-y-6" 
                                autoComplete="off"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">New Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-12 md:pl-16 pr-12 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-base"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-brown/20 hover:text-brand-primary transition-colors outline-none"
                                            >
                                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-brown/40 ml-4 md:ml-6">Confirm Password</label>
                                        <div className="relative group">
                                            <ShieldCheck className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-brand-brown/20 group-focus-within:text-brand-primary transition-colors size-[18px] md:size-[20px]" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-14 md:pl-16 pr-14 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-brand-pink/5 border-2 border-transparent focus:border-brand-primary/20 focus:bg-white focus:ring-8 focus:ring-brand-pink/20 outline-none transition-all font-bold text-brand-brown text-base"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-brown/20 hover:text-brand-primary transition-colors outline-none"
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-bubbly bg-brand-primary text-white font-black py-5 md:py-6 rounded-2xl md:rounded-3xl uppercase tracking-widest text-[9px] md:text-xs border-none shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <> <Sparkles size={18} className="md:size-[20px]" /> <span>RESET PASSWORD</span> </>}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <p className="text-center mt-12 text-brand-brown/40 font-bold">
                        {step === 1 ? (
                            <>Remembered your key? <Link to="/login" className="text-brand-primary font-black hover:underline px-2 py-1 rounded-lg hover:bg-brand-pink/10 transition-all ml-1">Back to Login</Link></>
                        ) : (
                            <button onClick={() => setStep(1)} className="text-brand-brown/40 hover:text-brand-primary transition-colors text-xs uppercase tracking-widest font-black flex items-center gap-2 mx-auto">
                                <ArrowLeft size={14} /> Back to email
                            </button>
                        )}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;