// src/pages/ProfilePage.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, Plus, Edit, Trash2, Check, X, ArrowLeft, Package, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { USER_API_BASE } from "../config";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [userId, setUserId] = useState('');

  // Form states
  const [profileForm, setProfileForm] = useState({ name: '', email: '', password: '' });
  const [addressForm, setAddressForm] = useState({
    street: '', city: '', state: '', zip: '', country: 'India', isDefault: false
  });

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${USER_API_BASE}/${userId}`);
      setUser(res.data.user);
      setProfileForm({ name: res.data.user.name, email: res.data.user.email, password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Get user ID from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser?._id) {
          setUserId(parsedUser._id);
        } else {
          setLoading(false);
          setError('User ID not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setLoading(false);
        setError('Session expired. Please log in again.');
      }
    } else {
      setLoading(false);
      // Optional: navigate('/login') could be done here as well
      setError('Please log in to view your profile.');
    }
  }, []);

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId, fetchUser]);

  const showMessage = (msg, type = 'success') => {
    if (type === 'success') setSuccess(msg);
    else setError(msg);
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 4000);
  };

  // === UPDATE PROFILE ===
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (profileForm.name !== user.name) payload.name = profileForm.name;
      if (profileForm.email !== user.email) payload.email = profileForm.email;
      if (profileForm.password) payload.password = profileForm.password;

      if (Object.keys(payload).length === 0) {
        setEditingProfile(false);
        return;
      }

      const res = await axios.put(`${USER_API_BASE}/${userId}`, payload);
      setUser(res.data.user);
      setEditingProfile(false);
      showMessage('Profile updated successfully');
    } catch (err) {
      showMessage(err.response?.data?.message || 'Update failed', 'error');
    }
  };

  // === ADD ADDRESS ===
  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_BASE}/${userId}/address`, addressForm);
      setUser({ ...user, addresses: res.data.addresses });
      setShowAddAddress(false);
      setAddressForm({ street: '', city: '', state: '', zip: '', country: 'India', isDefault: false });
      showMessage('Address added');
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to add address', 'error');
    }
  };

  // === UPDATE ADDRESS ===
  const updateAddress = async (e, index) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${USER_API_BASE}/${userId}/address`, { index, address: addressForm });
      setUser({ ...user, addresses: res.data.addresses });
      setEditingAddressIndex(null);
      showMessage('Address updated');
    } catch (err) {
      showMessage(err.response?.data?.message || 'Update failed', 'error');
    }
  };

  // === DELETE ADDRESS ===
  const deleteAddress = async (index) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      const res = await axios.delete(`${USER_API_BASE}/${userId}/address`, { data: { index } });
      setUser({ ...user, addresses: res.data.addresses });
      showMessage('Address deleted');
    } catch (err) {
      showMessage(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-brand flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-8 border-pastel-pink/20 border-t-brand-primary rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Summoning your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-white font-brand flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 text-center max-w-md border-2 border-white">
          <X className="w-20 h-20 mx-auto text-red-400 mb-8" />
          <p className="text-gray-900 font-black text-xl mb-6">{error}</p>
          <Link to="/login" className="btn-bubbly bg-brand-primary text-white px-10 py-4 border-none inline-block">← Back to Login</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-brand pt-32 pb-10 md:pt-40 md:pb-20 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-pastel-pink/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-pastel-yellow/10 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-10 md:mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-primary font-black mb-4 hover:gap-4 transition-all uppercase tracking-widest text-[10px]"><ArrowLeft size={14} /> Heart of Propz</Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-3">My <span className="text-brand-primary">Space!</span></h1>
          <p className="text-gray-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">Manage your magic and delivery spots</p>
        </header>

        {/* Success Alert */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-green-50 rounded-3xl border-2 border-green-100 text-green-600 font-bold text-center text-sm"
            >
              <Check className="inline-block mr-2" size={18} /> {success}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-xl p-5 sm:p-6 md:p-12 border-4 border-white relative overflow-hidden">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-4">
                  <User className="text-brand-primary" size={28} /> Personal
                </h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="px-6 py-2 rounded-full bg-pastel-pink/10 text-brand-primary font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2"
                >
                  <Edit size={14} /> {editingProfile ? 'Abort' : 'edit'}
                </button>
              </div>

              {editingProfile ? (
                <form onSubmit={updateProfile} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-pastel-pink/5 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all focus:bg-white"
                  />
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      value={profileForm.email}
                      readOnly
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent outline-none font-bold text-gray-400 cursor-not-allowed transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-gray-200">
                      <Lock size={10} className="text-gray-400" />
                      <span className="text-gray-400 text-[8px] font-black uppercase tracking-widest">Read Only</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button type="submit" className="flex-1 btn-bubbly bg-brand-primary text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs border-none shadow-lg">Commit Changes</button>
                    <button type="button" onClick={() => setEditingProfile(false)} className="flex-1 px-6 py-4 rounded-2xl bg-gray-100 text-gray-500 font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Nevermind</button>
                  </div>
                </form>
              ) : (
                <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">True Name</p>
                    <p className="text-xl font-black text-gray-900 tracking-tighter flex items-center gap-3"><User className="text-brand-primary" size={20} /> {user.name}</p>
                  </div>
                  <div className="space-y-2 overflow-hidden">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">Email Bit</p>
                    <p className="text-lg sm:text-xl font-black text-gray-900 tracking-tighter flex items-start sm:items-center gap-3 break-all"><Mail className="text-brand-primary flex-shrink-0 mt-1 sm:mt-0" size={20} /> {user.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Addresses Section */}
            <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-xl p-5 sm:p-6 md:p-12 border-4 border-white relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-4">
                  <MapPin className="text-brand-primary" size={28} /> Spots
                </h2>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="px-6 py-2 rounded-full bg-pastel-pink/10 text-brand-primary font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2"
                >
                  <Plus size={14} /> Add Spot
                </button>
              </div>

              {user?.addresses?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50/50 rounded-[2rem] border-4 border-dashed border-gray-100">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No spots tracked yet.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {user?.addresses?.map((addr, i) => (
                    <div
                      key={i}
                      className={`p-6 md:p-10 rounded-[2rem] border-4 transition-all ${addr.isDefault ? 'border-brand-primary bg-pastel-pink/5' : 'border-gray-50 bg-gray-50/30'}`}
                    >
                      {editingAddressIndex === i ? (
                        <form onSubmit={(e) => updateAddress(e, i)} className="space-y-4">
                          <input
                            type="text"
                            placeholder="Street"
                            value={addressForm.street}
                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                            required
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="City"
                              value={addressForm.city}
                              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                              className="px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                              required
                            />
                            <input
                              type="text"
                              placeholder="State"
                              value={addressForm.state}
                              onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                              className="px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                              required
                            />
                            <input
                              type="text"
                              placeholder="ZIP"
                              value={addressForm.zip}
                              onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                              className="px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Country"
                              value={addressForm.country}
                              onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                              className="px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all shadow-sm"
                              required
                            />
                          </div>
                          <label className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400 px-4">
                            <input
                              type="checkbox"
                              checked={addressForm.isDefault}
                              onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                              className="w-5 h-5 rounded-lg border-2 border-pastel-pink text-brand-primary focus:ring-brand-primary"
                            />
                            Set as default
                          </label>
                          <div className="flex gap-4 pt-4">
                            <button type="submit" className="flex-1 btn-bubbly bg-brand-primary text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs border-none shadow-lg">Save Spot</button>
                            <button type="button" onClick={() => setEditingAddressIndex(null)} className="flex-1 px-6 py-4 rounded-2xl bg-gray-100 text-gray-500 font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Abort</button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                          <div>
                            <p className="font-black text-gray-900 text-xl tracking-tighter mb-2 leading-none uppercase">
                              {addr.street}
                            </p>
                            <p className="text-gray-400 font-bold text-sm tracking-wide">
                              {addr.city}, {addr.state} - {addr.zip}
                            </p>
                            {addr.isDefault && (
                              <span className="inline-flex mt-6 px-4 py-2 bg-brand-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest leading-none">
                                Main Spot
                              </span>
                            )}
                          </div>
                          <div className="flex gap-3 w-full md:w-auto">
                            <button
                              onClick={() => {
                                setEditingAddressIndex(i);
                                setAddressForm({
                                  street: addr.street,
                                  city: addr.city,
                                  state: addr.state,
                                  zip: addr.zip,
                                  country: addr.country,
                                  isDefault: addr.isDefault
                                });
                              }}
                              className="flex-1 md:flex-none p-4 bg-pastel-pink/5 text-brand-primary rounded-2xl hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center"
                            >
                              <Edit size={20} />
                            </button>
                            <button
                              onClick={() => deleteAddress(i)}
                              className="flex-1 md:flex-none p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Address Dialog/Form */}
            <AnimatePresence>
              {showAddAddress && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl p-6 md:p-12 border-4 border-brand-primary/20"
                >
                  <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tighter">Enter New Spot</h3>
                  <form onSubmit={addAddress} className="space-y-6">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-pastel-pink/5 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all focus:bg-white"
                      required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-pastel-pink/5 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all focus:bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-pastel-pink/5 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all focus:bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={addressForm.zip}
                        onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-pastel-pink/5 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all focus:bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={addressForm.country}
                        onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-pastel-pink/5 border-2 border-transparent focus:border-brand-primary/20 outline-none font-bold text-gray-700 transition-all focus:bg-white"
                        required
                      />
                    </div>
                    <label className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400 px-4">
                      <input
                        type="checkbox"
                        checked={addressForm.isDefault}
                        onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                        className="w-5 h-5 rounded-lg border-2 border-pastel-pink text-brand-primary focus:ring-brand-primary"
                      />
                      Set as default address
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button type="submit" className="flex-1 btn-bubbly bg-brand-primary text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs border-none shadow-lg">Plant Spot</button>
                      <button type="button" onClick={() => setShowAddAddress(false)} className="flex-1 px-6 py-4 rounded-2xl bg-gray-100 text-gray-500 font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Nevermind</button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-xl p-5 sm:p-6 md:p-10 sticky top-6 space-y-4 border-4 border-white">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-4 text-center">Fast Tracks</h3>
              <div className="space-y-3">
                <Link
                  to="/my-orders"
                  className="flex items-center gap-4 p-5 bg-pastel-pink/5 text-gray-900 rounded-[1.5rem] hover:bg-brand-primary hover:text-white transition-all group font-black uppercase tracking-widest text-[10px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <Package className="text-brand-primary" size={18} />
                  </div>
                  My Loots
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-4 p-5 bg-pastel-pink/5 text-gray-900 rounded-[1.5rem] hover:bg-brand-primary hover:text-white transition-all group font-black uppercase tracking-widest text-[10px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <Heart className="text-brand-primary" size={18} />
                  </div>
                  Saved Gems
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center gap-4 p-5 bg-pastel-pink/5 text-gray-900 rounded-[1.5rem] hover:bg-brand-primary hover:text-white transition-all group font-black uppercase tracking-widest text-[10px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail className="text-brand-primary" size={18} />
                  </div>
                  Support Hub
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-4 p-5 bg-red-50 text-red-600 rounded-[1.5rem] hover:bg-red-500 hover:text-white transition-all group font-black uppercase tracking-widest text-[10px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <LogOut size={18} className="text-red-500" />
                  </div>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;