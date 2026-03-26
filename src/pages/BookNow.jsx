import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Sparkles, 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  CheckCircle2,
  Gift,
  Baby,
  Heart,
  PartyPopper,
  Briefcase
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE } from '../config';

const ORDER_API = `${API_BASE}/api/order`;

const occasionIcons = {
  "Birthday Party": <Gift size={24} />,
  "Baby Shower": <Baby size={24} />,
  "Anniversaries": <Heart size={24} />,
  "Bachelor Party": <PartyPopper size={24} />,
  "Corporate": <Briefcase size={24} />,
  "Custom Events": <Sparkles size={24} />
};

const BookNow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [occasion, setOccasion] = useState(location.state?.occasion || 'Custom Events');
    const [isBooking, setIsBooking] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventTime: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        paymentMethod: 'cod'
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                setUser(parsed);
                setFormData(prev => ({
                    ...prev,
                    name: parsed.name || '',
                    email: parsed.email || '',
                    phone: parsed.phone || ''
                }));
            } catch (e) {
                navigate('/login');
            }
        } else {
            toast.info("Please login to book your magic! ✨");
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        const payload = {
            userId: user._id,
            orderItems: [{
                product: '68fb3231dac5b5404f2d1322', // Corrected 24-char ID
                title: `Event Booking: ${occasion}`,
                price: 0,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=80'
            }],
            shippingAddress: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
                country: formData.country,
                name: formData.name,
                phone: formData.phone
            },
            paymentMethod: formData.paymentMethod,
            totalAmount: 0,
            eventDate: formData.eventDate,
            eventTime: formData.eventTime,
            occasion: occasion
        };

        try {
            setIsBooking(true);
            await axios.post(ORDER_API, payload);
            toast.success("Magic Booked! ✨ We'll contact you soon.");
            navigate('/my-orders');
        } catch (err) {
            toast.error(err.response?.data?.message || "Magic fumbled. Try again!");
        } finally {
            setIsBooking(false);
        }
    };

    const inputClasses = "w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-slate-700 transition-all focus:bg-white shadow-sm";
    const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-2";

    return (
        <div className="min-h-screen bg-white font-brand pt-32 pb-20 px-4 md:px-10 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-pastel-yellow/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]" />

            <div className="max-w-4xl mx-auto relative z-10">
                <header className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-brand-primary font-black mb-6 hover:gap-4 transition-all uppercase tracking-widest text-[10px]">
                        <ArrowLeft size={16} /> Back to Magic
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-brand-primary rounded-3xl flex items-center justify-center text-white shadow-xl rotate-6">
                            {occasionIcons[occasion] || <Sparkles size={32} />}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-none">
                                Book Your <span className="text-brand-primary">Magic.</span>
                            </h1>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                                {occasion} Custom Celebration
                            </p>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Section 1: Personal Details */}
                    <motion.section 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-50"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                                <User size={20} />
                            </div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Who's Celebrating?</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={labelClasses}>Full Name</label>
                                <input 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Email Address</label>
                                <input 
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Phone Number</label>
                                <input 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 XXXXX XXXXX"
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Occasion Type</label>
                                <select 
                                    value={occasion}
                                    onChange={(e) => setOccasion(e.target.value)}
                                    className={inputClasses}
                                >
                                    {Object.keys(occasionIcons).map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 2: Event Details */}
                    <motion.section 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-50"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                                <Calendar size={20} />
                            </div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">When & Where?</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className={labelClasses}>Event Date</label>
                                <input 
                                    name="eventDate"
                                    type="date"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    min={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClasses}>Event Time</label>
                                <input 
                                    name="eventTime"
                                    type="time"
                                    value={formData.eventTime}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className={labelClasses}>Event Street Address</label>
                                <input 
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    placeholder="Building Name, Area, Street"
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className={inputClasses}
                                    required
                                />
                                <input 
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    placeholder="ZIP/PIN Code"
                                    className={inputClasses}
                                    required
                                />
                                <input 
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className={inputClasses}
                                    required
                                />
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3: Payment */}
                    <motion.section 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-50"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                                <CreditCard size={20} />
                            </div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Payment Method</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { id: 'cod', label: 'Cash on Arrival', icon: Wallet, desc: 'Pay after celebration' },
                                { id: 'online', label: 'Online Payment', icon: CreditCard, desc: 'Secure digital magic' },
                            ].map((method) => (
                                <label 
                                    key={method.id} 
                                    className={`flex items-center justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.paymentMethod === method.id ? 'border-brand-primary bg-brand-primary/5 shadow-xl' : 'border-slate-50 bg-slate-50/30 hover:bg-slate-50'}`}
                                >
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-slate-800 text-sm tracking-tight">{method.label}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{method.desc}</span>
                                    </div>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value={method.id} 
                                        checked={formData.paymentMethod === method.id} 
                                        onChange={handleChange} 
                                        className="w-5 h-5 text-brand-primary focus:ring-brand-primary" 
                                    />
                                </label>
                            ))}
                        </div>
                    </motion.section>

                    <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isBooking}
                        className="w-full max-w-sm mx-auto py-5 rounded-3xl font-black text-white text-sm uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        style={{ background: "linear-gradient(135deg, #F58529 0%, #DD2A7B 100%)" }}
                    >
                        {isBooking ? (
                            <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Sparkles size={24} />
                                <span>Confirm Booking</span>
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-40">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">7-Day Reminders</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Premium Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Secure Handled</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookNow;
