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
      <div className="min-h-screen bg-white font-jakarta flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-500 font-medium tracking-wide text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-50 font-jakarta flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center max-w-md border border-gray-100">
          <X className="w-16 h-16 mx-auto text-red-400 mb-6" />
          <p className="text-gray-800 font-semibold text-lg mb-8">{error}</p>
          <Link to="/login" className="bg-brand-primary text-white px-10 py-3.5 rounded-full font-bold inline-block hover:bg-brand-primary/90 transition-colors">Back to Login</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-jakarta pt-28 pb-10 md:pt-36 md:pb-20 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(199,48,32,0.03)_0%,transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-medium mb-4 hover:text-brand-primary transition-colors text-xs">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">My <span className="text-brand-primary">Account</span></h1>
          <p className="text-gray-500 font-medium text-sm">Manage your profile information and saved addresses</p>
        </header>

        {/* Success Alert */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-green-50 rounded-2xl border border-green-100 text-green-700 font-semibold text-center text-sm"
            >
              <Check className="inline-block mr-2" size={16} /> {success}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-gray-100 relative overflow-hidden">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <User className="text-gray-400" size={24} /> Account Information
                </h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="px-5 py-2 rounded-lg bg-gray-50 text-gray-600 font-semibold text-xs hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-200"
                >
                  <Edit size={14} /> {editingProfile ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {editingProfile ? (
                <form onSubmit={updateProfile} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">Email (Read Only)</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={profileForm.email}
                        readOnly
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-100 border border-gray-200 outline-none font-medium text-gray-500 cursor-not-allowed"
                      />
                      <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button type="submit" className="flex-1 bg-brand-primary text-white font-bold py-3.5 rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">Save Changes</button>
                    <button type="button" onClick={() => setEditingProfile(false)} className="flex-1 px-5 py-3.5 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-all">Discard</button>
                  </div>
                </form>
              ) : (
                <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</p>
                    <p className="text-lg font-bold text-gray-800">{user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-lg font-bold text-gray-800 break-all">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Addresses Section */}
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-gray-100">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <MapPin className="text-gray-400" size={24} /> Saved Addresses
                </h2>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="px-5 py-2 rounded-lg bg-brand-primary/5 text-brand-primary font-semibold text-xs hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2 border border-brand-primary/10"
                >
                  <Plus size={14} /> Add Address
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
                      className={`p-6 rounded-2xl border transition-all ${addr.isDefault ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-100 bg-gray-50'}`}
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
                              className="px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all shadow-sm"
                              required
                            />
                            <input
                              type="text"
                              placeholder="State"
                              value={addressForm.state}
                              onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                              className="px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all shadow-sm"
                              required
                            />
                            <input
                              type="text"
                              placeholder="ZIP"
                              value={addressForm.zip}
                              onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                              className="px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all shadow-sm"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Country"
                              value={addressForm.country}
                              onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                              className="px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all shadow-sm"
                              required
                            />
                          </div>
                          <label className="flex items-center gap-3 text-xs font-semibold text-gray-500 px-1">
                            <input
                              type="checkbox"
                              checked={addressForm.isDefault}
                              onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                              className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                            />
                            Set as default address
                          </label>
                          <div className="flex gap-3 pt-4">
                            <button type="submit" className="flex-1 bg-brand-primary text-white font-bold py-3 rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/10">Save Address</button>
                            <button type="button" onClick={() => setEditingAddressIndex(null)} className="flex-1 px-5 py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-all">Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                          <div>
                            <p className="font-bold text-gray-800 text-lg mb-1">
                              {addr.street}
                            </p>
                            <p className="text-gray-500 font-medium text-sm">
                              {addr.city}, {addr.state} - {addr.zip}
                            </p>
                            {addr.isDefault && (
                              <span className="inline-flex mt-4 px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                                Default Address
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2 w-full md:w-auto">
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
                              className="flex-1 md:flex-none p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center font-semibold text-xs gap-2"
                            >
                              <Edit size={16} /> Edit
                            </button>
                            <button
                              onClick={() => deleteAddress(i)}
                              className="flex-1 md:flex-none p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                            >
                              <Trash2 size={16} />
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
                  className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-8">Add New Address</h3>
                  <form onSubmit={addAddress} className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 ml-1">Street Address</label>
                      <input
                        type="text"
                        placeholder="e.g. 123 Luxury Lane"
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all focus:bg-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 ml-1">City</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all focus:bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 ml-1">State</label>
                        <input
                          type="text"
                          placeholder="State"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all focus:bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 ml-1">ZIP Code</label>
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          value={addressForm.zip}
                          onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all focus:bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 ml-1">Country</label>
                        <input
                          type="text"
                          placeholder="Country"
                          value={addressForm.country}
                          onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary/30 outline-none font-medium text-gray-700 transition-all focus:bg-white"
                          required
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-3 text-xs font-semibold text-gray-500 px-1">
                      <input
                        type="checkbox"
                        checked={addressForm.isDefault}
                        onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      />
                      Set as default address
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button type="submit" className="flex-1 bg-brand-primary text-white font-bold py-3.5 rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">Save Address</button>
                      <button type="button" onClick={() => setShowAddAddress(false)} className="flex-1 px-5 py-3.5 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-all">Cancel</button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 sticky top-6 space-y-2 border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/my-orders"
                  className="flex items-center gap-4 p-4 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/5 flex items-center justify-center flex-shrink-0">
                    <Package className="text-brand-primary" size={20} />
                  </div>
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-4 p-4 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/5 flex items-center justify-center flex-shrink-0">
                    <Heart className="text-brand-primary" size={20} />
                  </div>
                  Wishlist
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center gap-4 p-4 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-brand-primary" size={20} />
                  </div>
                  Settings & Support
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-4 p-4 text-red-600 rounded-xl hover:bg-red-50 transition-all font-semibold text-sm border border-transparent hover:border-red-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <LogOut size={20} className="text-red-500" />
                  </div>
                  Logout
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