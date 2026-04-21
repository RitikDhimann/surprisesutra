import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, ArrowLeft, Sparkles, MapPin, Mail, Trash2, Box, ExternalLink, ShieldCheck, Zap, Phone, Heart, X } from 'lucide-react';
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
      <div className="min-h-screen bg-white font-jakarta flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-500 font-medium tracking-wide text-sm">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative overflow-hidden pt-28 pb-10 md:pt-40 md:pb-24 px-4 md:px-8 lg:px-12">
      {/* Background Subtle Blurs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-primary/3 rounded-full blur-[80px] md:blur-[120px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gray-200/20 rounded-full blur-[80px] md:blur-[120px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-medium hover:text-brand-primary transition-colors text-xs">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-none">
               My <span className="text-brand-primary">Orders</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-white shadow-sm px-6 py-4 rounded-2xl border border-gray-100 transition-all hover:shadow-md self-center md:self-auto w-full sm:w-auto">
            <div className="w-12 h-12 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary flex-shrink-0">
               <Package size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Account Summary</p>
              <p className="text-xl font-bold text-gray-900 leading-none">{orders.length} <span className="text-gray-400 font-medium">Orders</span></p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Main Column: Order List */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10 order-2 lg:order-1">
            {orders.length === 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-sm p-10 md:p-20 text-center border border-gray-100 mx-auto">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
                  <Package size={32} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">No Orders Found</h2>
                <p className="text-gray-500 font-medium mb-10 text-sm">It looks like you haven't placed any orders yet.</p>
                <Link to="/diy-kits" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-brand-primary/90 transition-all">
                  <Sparkles size={18} />
                  <span>Start Shopping</span>
                </Link>
              </motion.div>
            ) : (
              <AnimatePresence>
                {orders.map((order, idx) => {
                  return (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
                    >
                      {/* Order Info Bar */}
                      <div className="bg-gray-50/50 px-6 py-4 md:px-8 md:py-5 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                         <div className="flex flex-wrap items-center gap-6 md:gap-10 w-full sm:w-auto">
                            <div>
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Order ID</p>
                               <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { if(typeof navigator !== 'undefined') { navigator.clipboard.writeText(order._id); toast.info("ID Copied!"); } }}>
                                  <p className="text-sm font-bold text-gray-800 tracking-tight">#{order._id.slice(-8).toUpperCase()}</p>
                                  <ExternalLink size={12} className="text-gray-300 group-hover:text-brand-primary transition-colors" />
                               </div>
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-gray-200" />
                            <div>
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Date Placed</p>
                               <p className="text-sm font-semibold text-gray-700 tracking-tight">{formatDate(order.createdAt)}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                            {order.orderStatus === 'processing' && (
                              <button 
                                onClick={() => handleCancelOrder(order._id)} 
                                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-bold text-[10px] uppercase tracking-wide flex items-center gap-2"
                              >
                                 <X size={14} /> Cancel Order
                              </button>
                            )}
                            {(order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') && (
                              <button onClick={() => handleDeleteOrder(order._id)} className="p-2.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                                 <Trash2 size={16} />
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
                                            {/* Items List */}
                      <div className="p-6 md:p-8 space-y-8">
                         <div className="space-y-6">
                            {order.orderItems.map((item, i) => (
                              <div key={i} className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                                 <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm relative">
                                    <img
                                       src={item.image?.startsWith("http") ? item.image : `${API_BASE}/${item.image?.replace(/^\//, "")}`}
                                       alt={item.title}
                                       className="w-full h-full object-cover"
                                       onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                                    />
                                 </div>
                                 <div className="flex-1 min-w-0 text-center sm:text-left">
                                    <h4 className="text-base font-bold text-gray-900 tracking-tight">{item.title}</h4>
                                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-1.5 font-medium">
                                       <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                                       <div className="w-1 h-1 bg-gray-200 rounded-full" />
                                       <p className="text-xs text-brand-primary font-bold">₹ {item.price.toLocaleString()}</p>
                                    </div>
                                 </div>
                                 <div className="text-right hidden sm:block">
                                    <p className="text-lg font-bold text-gray-900">₹ {(item.price * item.quantity).toLocaleString()}</p>
                                 </div>
                              </div>
                            ))}
                         </div>
 
                         {/* Card Footer: Address & Total */}
                         <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-start gap-3 w-full sm:w-auto">
                               <MapPin size={14} className="text-gray-400 mt-1 flex-shrink-0" />
                               <div className="text-left">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Shipping Address</p>
                                  <p className="text-[11px] font-medium text-gray-600 leading-relaxed uppercase">
                                     {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}
                                  </p>
                               </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-10 w-full sm:w-auto bg-gray-50 p-4 sm:p-0 sm:bg-transparent rounded-xl">
                               <div className="text-left sm:text-right">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Order Total</p>
                                  <p className="text-xl font-bold text-gray-900">₹ {order.totalPrice.toLocaleString()}</p>
                               </div>
                               <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                                  <ExternalLink size={18} />
                               </button>
                            </div>
                         </div>
                      </div>   </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-32 space-y-6 order-1 lg:order-2">
            {/* Order Stats */}
            <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Zap size={60} fill="currentColor" />
                </div>
                <h2 className="text-[10px] font-bold text-gray-400 mb-8 uppercase tracking-widest flex items-center gap-2">
                   <Box size={14} className="text-gray-400" /> Order Overview
                </h2>
                
                <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <span className="text-xs font-semibold text-gray-500">Total Orders</span>
                        <span className="text-sm font-bold text-gray-900">{orders.length}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <span className="text-xs font-semibold text-gray-500">Delivered</span>
                        <span className="text-sm font-bold text-green-600">{orders.filter(o => o.orderStatus === 'delivered').length}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <span className="text-xs font-semibold text-gray-500">In Progress</span>
                        <span className="text-sm font-bold text-brand-primary">{orders.filter(o => o.orderStatus === 'processing' || o.orderStatus === 'shipped' || o.orderStatus === 'out_for_delivery').length}</span>
                    </div>
                </div>

                <div className="h-px bg-gray-100 my-8" />
                
                <div className="space-y-1 relative z-10">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Customer Status</p>
                   <p className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      {orders.length > 5 ? 'Elite Member' : orders.length > 2 ? 'Valued Customer' : 'New Customer'}
                      <Heart size={14} fill="#c73020" className="text-brand-primary animate-pulse" />
                   </p>
                </div>
            </div>

            {/* Support */}
            <div className="bg-gray-900 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
               <h3 className="text-white font-bold text-xl mb-4 tracking-tight relative z-10 leading-tight">Need help with <br className="hidden md:block"/> an order?</h3>
               <p className="text-white/60 text-xs font-medium leading-relaxed mb-8 relative z-10">Our support team is here to assist you with any questions about your purchases.</p>
               <div className="space-y-3 relative z-10">
                  <a href="mailto:support@surprisesutra.com" className="w-full py-4 rounded-xl bg-white text-gray-900 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-lg hover:bg-gray-50 transition-all">
                     <Mail size={14} /> Contact Support
                  </a>
                  <button className="w-full py-4 rounded-xl bg-white/10 text-white font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/10 backdrop-blur">
                     <Phone size={14} /> Call Us
                  </button>
               </div>
            </div>

            {/* Secure Badge */}
            <div className="flex items-center justify-center gap-3 opacity-30 hover:opacity-100 transition-opacity pb-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <ShieldCheck size={16} />
                <span>Secure Shopping Verified</span>
            </div>
          </aside>
        </div>

        {/* Brand Sign-off */}
        <div className="mt-16 md:mt-24 text-center space-y-4 opacity-50 border-t border-gray-100 pt-16">
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] leading-none mb-2 text-gray-900">Surprise Sutra</p>
           <p className="text-[9px] font-medium uppercase tracking-widest text-gray-500">Providing quality since 2024 ✨</p>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;