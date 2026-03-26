import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, ArrowLeft, Sparkles, Gift, MapPin, Mail, Trash2, Box, ExternalLink, ShieldCheck, Zap, Phone, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE } from "../config";

const ORDER_API = `${API_BASE}/api/order`;

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserId(parsedUser._id);
      } catch (err) {
        console.error('Failed to parse user:', err);
      }
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ORDER_API}/user/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId, fetchOrders]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to remove this record? 🗑️")) return;
    try {
      await axios.delete(`${ORDER_API}/${orderId}`);
      toast.success("Record cleared!");
      setOrders(orders.filter(o => o._id !== orderId));
    } catch (err) {
      toast.error("Failed to delete record");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this magic order? 😢")) return;
    try {
      await axios.patch(`${ORDER_API}/${orderId}/status`, { orderStatus: 'cancelled' });
      toast.success("Order cancelled");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-brand flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-8 border-pastel-pink/20 border-t-brand-primary rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Summoning your treasures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-brand relative overflow-hidden pt-28 pb-10 md:pt-44 md:pb-24 px-4 md:px-8 lg:px-12">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-primary/5 rounded-full blur-[80px] md:blur-[120px] -mr-32 -mt-32 md:-mr-64 md:-mt-64" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-pastel-yellow/5 rounded-full blur-[80px] md:blur-[120px] -ml-32 -mb-32 md:-ml-64 md:-mb-64" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Cart Style */}
        <header className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div className="space-y-4 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2 text-brand-primary font-black hover:gap-4 transition-all uppercase tracking-widest text-[9px] md:text-[10px]">
              <ArrowLeft size={14} /> Heart of Propz
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none italic">
               My <span className="text-brand-primary not-italic">Treasures!</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 md:gap-6 bg-white/80 backdrop-blur-md px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-[2.5rem] border-2 border-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group self-center md:self-auto w-full sm:w-auto">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-primary/5 rounded-xl md:rounded-2xl flex items-center justify-center text-brand-primary group-hover:rotate-12 transition-transform shadow-inner flex-shrink-0">
               <Gift size={20} />
            </div>
            <div>
              <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Loot</p>
              <p className="text-xl md:text-2xl font-black text-gray-900 leading-none">{orders.length} <span className="text-brand-primary opacity-50">Orders</span></p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Main Column: Order List */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10 order-2 lg:order-1">
            {orders.length === 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl p-10 md:p-16 text-center border-4 border-white mx-auto">
                <div className="w-20 h-20 bg-brand-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-primary shadow-inner">
                  <Package size={40} strokeWidth={1} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tighter leading-none">The Vault is <span className="text-brand-primary">Empty!</span></h2>
                <p className="text-gray-400 font-bold mb-8 uppercase tracking-widest text-[9px] md:text-xs leading-relaxed">Fill this space with magical memories.</p>
                <Link to="/diy-kits" className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-brand-primary text-white font-black py-4 md:py-5 px-8 md:px-10 rounded-full shadow-2xl hover:scale-105 transition-all outline-none">
                  <Sparkles size={16} />
                  <span className="uppercase tracking-widest text-[10px]">Summon Magic</span>
                </Link>
              </motion.div>
            ) : (
              <AnimatePresence>
                {orders.map((order, idx) => {
                  return (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-lg md:shadow-xl border-2 md:border-4 border-white hover:border-pastel-pink/10 transition-all overflow-hidden"
                    >
                      {/* Order Info Bar */}
                      <div className="bg-[#FAFAFA] px-6 py-5 md:px-10 md:py-6 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                         <div className="flex flex-wrap items-center gap-6 md:gap-8 w-full sm:w-auto">
                            <div className="flex-1 sm:flex-none">
                               <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Order Identity</p>
                               <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { if(typeof navigator !== 'undefined') navigator.clipboard.writeText(order._id); toast.info("Full ID Copied!"); }}>
                                  <p className="text-sm md:text-base font-black text-gray-900 tracking-tighter leading-none">#{order._id.toUpperCase()}</p>
                                  <ExternalLink size={10} className="text-gray-300 group-hover:text-brand-primary transition-colors" />
                               </div>
                            </div>
                            <div className="w-px h-5 bg-gray-200 hidden sm:block" />
                            <div className="flex-1 sm:flex-none">
                               <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Captured Date</p>
                               <p className="text-xs md:text-sm font-bold text-gray-700 tracking-tighter leading-none">{formatDate(order.createdAt)}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            {order.orderStatus === 'processing' && (
                              <button 
                                onClick={() => handleCancelOrder(order._id)} 
                                className="px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-100 font-black text-[8px] md:text-[9px] uppercase tracking-widest flex items-center gap-2"
                              >
                                 <X size={12} /> Cancel Magic
                              </button>
                            )}
                            {(order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') && (
                              <button onClick={() => handleDeleteOrder(order._id)} className="p-2 md:p-3 rounded-xl bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100 hover:border-red-100 flex-shrink-0">
                                 <Trash2 size={14} />
                              </button>
                            )}
                         </div>
                      </div>

                      {/* Status Tracker Line - Re-added for "Puri Line" requirement */}
                      <div className="px-6 md:px-10 py-8 bg-white border-b border-gray-50 overflow-x-auto">
                         <div className="min-w-[500px] flex items-center justify-between relative px-2">
                            {/* Connector Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-2 relative">
                               <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: 
                                     order.orderStatus === 'delivered' ? '100%' : 
                                     order.orderStatus === 'out_for_delivery' ? '75%' : 
                                     order.orderStatus === 'shipped' ? '50%' : 
                                     order.orderStatus === 'processing' ? '25%' : '0%' 
                                  }}
                                  className="h-full bg-brand-primary rounded-full shadow-[0_0_10px_rgba(255,45,85,0.3)] transition-all duration-1000"
                               />
                            </div>
                            
                            {/* Tracker Nodes */}
                            {[ 
                               { s: 'processing', l: 'Brewing', i: Sparkles },
                               { s: 'shipped', l: 'In Transit', i: Box },
                               { s: 'out_for_delivery', l: 'En Route', i: Truck },
                               { s: 'delivered', l: 'Handed Over', i: CheckCircle }
                            ].map((node, i) => {
                               const isActive = 
                                  (order.orderStatus === 'delivered') || 
                                  (order.orderStatus === 'out_for_delivery' && i <= 2) ||
                                  (order.orderStatus === 'shipped' && i <= 1) ||
                                  (order.orderStatus === 'processing' && i === 0);
                               
                               return (
                                  <div key={node.s} className="flex flex-col items-center gap-3 relative z-10 w-24">
                                     <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${isActive ? 'bg-brand-primary text-white border-brand-primary shadow-lg scale-110' : 'bg-white text-gray-300 border-gray-100'}`}>
                                        <node.i size={18} />
                                     </div>
                                     <span className={`text-[9px] font-black uppercase tracking-widest text-center ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                                        {node.l}
                                     </span>
                                  </div>
                               );
                            })}
                         </div>
                      </div>

                      {/* Items List */}
                      <div className="p-6 md:p-10 space-y-8 md:space-y-10">
                         <div className="space-y-6 md:space-y-8">
                            {order.orderItems.map((item, i) => (
                              <div key={i} className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                                 <div className="w-24 h-24 md:w-20 md:h-20 bg-gray-50 rounded-2xl md:rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm relative">
                                    <img
                                       src={item.image?.startsWith("http") ? item.image : `${API_BASE}/${item.image?.replace(/^\//, "")}`}
                                       alt={item.title}
                                       className="w-full h-full object-cover"
                                       onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                                    />
                                    <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[10px] font-black text-brand-primary shadow-sm sm:hidden">
                                       ×{item.quantity}
                                    </div>
                                 </div>
                                 <div className="flex-1 min-w-0 text-center sm:text-left w-full sm:w-auto">
                                    <h4 className="text-base md:text-lg font-black text-gray-900 tracking-tighter leading-tight px-2 sm:px-0">{item.title}</h4>
                                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-1.5 md:mt-1">
                                       <p className="text-xs font-bold text-gray-500 hidden sm:block">Qty: {item.quantity}</p>
                                       <div className="w-1 h-1 bg-gray-200 rounded-full hidden sm:block" />
                                       <p className="text-xs font-black text-brand-primary uppercase tracking-widest underline underline-offset-4 decoration-1 md:decoration-2">Rs {item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="sm:hidden mt-3">
                                       <p className="text-lg font-black text-gray-900 tracking-tighter leading-none">Total: Rs {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                 </div>
                                 <div className="text-right hidden sm:block">
                                    <p className="text-lg font-black text-gray-900 tracking-tighter leading-none">Rs {(item.price * item.quantity).toLocaleString()}</p>
                                 </div>
                              </div>
                            ))}
                         </div>

                         {/* Mini Tracker & Total Summary Line */}
                         <div className="pt-6 md:pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6 md:gap-10">
                            <div className="flex items-start gap-3 text-gray-400 w-full sm:w-auto justify-center sm:justify-start">
                               <MapPin size={12} className="text-brand-primary flex-shrink-0 mt-1" />
                               <div className="text-left">
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Destined For</p>
                                  <p className="text-[11px] md:text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-tight">
                                     {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}
                                  </p>
                               </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-10 w-full sm:w-auto bg-gray-50/50 sm:bg-transparent p-4 sm:p-0 rounded-2xl">
                               <div className="text-left sm:text-right">
                                  <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Order Value</p>
                                  <p className="text-lg md:text-xl font-black text-gray-900 tracking-tighter leading-none">Rs {order.totalPrice.toLocaleString()}</p>
                               </div>
                               <button className="p-3 bg-white sm:bg-gray-100 rounded-xl text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm group">
                                  <ExternalLink size={16} />
                               </button>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            )}
          </div>

          {/* Sticky Sidebar: Order Stats */}
          <aside className="lg:sticky lg:top-32 space-y-6 order-1 lg:order-2">
            {/* Stats Summary */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-lg md:shadow-xl p-8 md:p-10 border-2 border-white relative overflow-hidden group hover:shadow-2xl transition-all">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Zap size={60} fill="currentColor" />
                </div>
                <h2 className="text-[9px] md:text-[10px] font-black text-gray-400 mb-6 md:mb-8 uppercase tracking-widest flex items-center gap-2">
                   <Box size={14} className="text-brand-primary" /> Loot Summary
                </h2>
                
                <div className="space-y-3 md:space-y-4 relative z-10">
                    <div className="flex justify-between items-center bg-[#FAFAFA]/50 p-3 rounded-xl border border-white/50">
                        <span className="text-[11px] md:text-xs font-medium text-gray-500">Magic Orders</span>
                        <span className="text-xs md:text-sm font-black text-gray-900">{orders.length}</span>
                    </div>
                    <div className="flex justify-between items-center bg-green-50/30 p-3 rounded-xl border border-white/50 text-green-600">
                        <span className="text-[11px] md:text-xs font-medium text-gray-500 font-brand">Delivered Boxes</span>
                        <span className="text-xs md:text-sm font-black italic">{orders.filter(o => o.orderStatus === 'delivered').length}</span>
                    </div>
                    <div className="flex justify-between items-center bg-purple-50/30 p-3 rounded-xl border border-white/50 text-brand-primary">
                        <span className="text-[11px] md:text-xs font-medium text-gray-500 font-brand">Brewing Magic</span>
                        <span className="text-xs md:text-sm font-black italic underline underline-offset-4">{orders.filter(o => o.orderStatus === 'processing').length}</span>
                    </div>
                </div>

                <div className="h-px bg-gray-100 my-6 md:my-8" />
                
                <div className="space-y-1 relative z-10">
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Collector Title</p>
                   <p className="text-lg md:text-xl font-black text-gray-900 tracking-tighter leading-none flex items-center gap-2 italic">
                      {orders.length > 5 ? 'Loot Legend' : orders.length > 2 ? 'Magic Collector' : 'New Apprentice'}
                      <Heart size={14} fill="#FF7EB3" className="text-pastel-pink animate-pulse" />
                   </p>
                </div>
            </div>

            {/* Support / Quick Actions */}
            <div className="bg-brand-primary p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
               <h3 className="text-white font-black text-lg md:text-xl mb-4 md:mb-6 tracking-tighter relative z-10 leading-tight">Need a Magic <br className="hidden md:block"/> Assistant? 🪄</h3>
               <p className="text-white/70 text-[10px] md:text-xs font-bold leading-relaxed mb-6 md:mb-8 relative z-10">Our support team is brewing magic items just for you. Reach out anytime!</p>
               <div className="space-y-3 relative z-10">
                  <a href="mailto:support@surprisesutra.com" className="w-full py-4 rounded-xl md:rounded-2xl bg-white text-brand-primary font-black uppercase tracking-widest text-[8px] md:text-[9px] flex items-center justify-center gap-2 md:gap-3 shadow-lg hover:scale-[1.02] transition-all outline-none">
                     <Mail size={12} /> Send a Message
                  </a>
                  <button className="w-full py-4 rounded-xl md:rounded-2xl bg-black/20 text-white font-black uppercase tracking-widest text-[8px] md:text-[9px] flex items-center justify-center gap-2 md:gap-3 hover:bg-black/30 transition-all border border-white/10 backdrop-blur active:scale-[0.98]">
                     <Phone size={12} /> Quick Help
                  </button>
               </div>
            </div>

            {/* Secure Magic Badge */}
            <div className="flex items-center justify-center gap-3 opacity-30 hover:opacity-100 transition-opacity pb-6 text-[9px] font-black uppercase tracking-widest">
                <ShieldCheck size={16} />
                <span>Premium Magic Verified</span>
            </div>
          </aside>
        </div>

        {/* Brand Sign-off */}
        <div className="mt-16 md:mt-24 text-center space-y-3 md:space-y-4 opacity-20 border-t border-gray-200 pt-10 md:pt-16">
           <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] leading-none mb-1 md:mb-2 text-gray-900 text-center">Surprise Sutra Collective</p>
           <p className="text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-gray-500">Making magic happen since the beginning ✨</p>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;