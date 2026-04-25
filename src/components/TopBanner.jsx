import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBanner = () => {
    const [banner, setBanner] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/banner/active`);
                if (res.data.success && res.data.banner) {
                    setBanner(res.data.banner);
                }
            } catch (err) {
                console.error("Banner fetch error:", err);
            }
        };
        fetchBanner();
    }, []);

    if (!banner || !banner.isActive || !isVisible) return null;

    const imageUrl = banner.image ? (banner.image.startsWith('http') ? banner.image : `${API_BASE}/${banner.image}`) : null;

    const bannerContent = (
        <div 
            className="relative w-full overflow-hidden py-6 px-4 flex items-center justify-center transition-all duration-500 animate-in fade-in slide-in-from-top duration-700"
            style={{ 
                backgroundColor: banner.backgroundColor, 
                color: banner.textColor 
            }}
        >
            {imageUrl && (
                <>
                    <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-black/30" />
                </>
            )}

            {/* Animated Background Subtle Effect */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-pulse" />

            <div className="relative flex items-center gap-3 max-w-7xl mx-auto px-4 group">
                <Sparkles size={14} className="text-current animate-pulse shrink-0" />
                
                <p className="text-xs md:text-sm font-black uppercase tracking-[0.15em] text-center leading-tight drop-shadow-md">
                    {banner.text}
                </p>

                {banner.link && (
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0 drop-shadow-md" />
                )}
            </div>

            <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsVisible(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors z-10"
                aria-label="Close banner"
            >
                <X size={14} className="opacity-60 hover:opacity-100" />
            </button>
        </div>
    );

    if (banner.link) {
        const isExternal = banner.link.startsWith('http');
        if (isExternal) {
            return (
                <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block no-underline">
                    {bannerContent}
                </a>
            );
        }
        return (
            <Link to={banner.link} className="block no-underline">
                {bannerContent}
            </Link>
        );
    }

    return bannerContent;
};

export default TopBanner;
