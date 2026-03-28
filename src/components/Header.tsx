'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faUser, faSignOutAlt, faChevronLeft, faChevronRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
    id: string;
    name: string;
}

interface Announcement {
    id: string;
    phrase: string;
}

interface HeaderProps {
    user: any;
    cartCount: number;
    onLogout: () => void;
    onLoginClick: () => void;
    onCartClick: () => void;
    onMobileMenuToggle: () => void;
    categories: Category[];
}

export default function Header({ user, cartCount, onLogout, onLoginClick, onCartClick, onMobileMenuToggle, categories }: HeaderProps) {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    
    // Announcements State
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMarquee, setIsMarquee] = useState(false);
    const phraseRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        
        // Fetch Announcements
        fetch('/api/announcements')
            .then(res => res.json())
            .then(data => {
                if (data.announcements && data.announcements.length > 0) {
                    setAnnouncements(data.announcements);
                }
            })
            .catch(err => console.error('Failed to fetch announcements:', err));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-slide announcements
    useEffect(() => {
        if (announcements.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % announcements.length);
        }, 5000); // 5 seconds per phrase

        return () => clearInterval(interval);
    }, [announcements]);

    // Check for marquee need
    useEffect(() => {
        if (phraseRef.current) {
            const isLong = phraseRef.current.scrollWidth > phraseRef.current.clientWidth;
            setIsMarquee(isLong);
        }
    }, [currentIndex, announcements, mounted]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    }

    const prevAnnouncement = () => {
        setCurrentIndex(prev => (prev - 1 + announcements.length) % announcements.length);
    };

    const nextAnnouncement = () => {
        setCurrentIndex(prev => (prev + 1) % announcements.length);
    };

    return (
        <motion.header className={`header ${scrolled ? 'scrolled' : ''}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="announcement-bar">
                {announcements.length > 1 && (
                    <span className="arrow arrow-left" onClick={prevAnnouncement}><FontAwesomeIcon icon={faChevronLeft} /></span>
                )}
                
                <div className="announcement-content-wrapper" ref={phraseRef}>
                    <AnimatePresence mode="wait">
                        {announcements.length > 0 ? (
                            <motion.div 
                                key={announcements[currentIndex].id}
                                className={`announcement-phrase ${isMarquee ? 'marquee-active' : ''}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                {announcements[currentIndex].phrase}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="default"
                                className="announcement-phrase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                Free delivery on orders over LKR 5000
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {announcements.length > 1 && (
                    <span className="arrow arrow-right" onClick={nextAnnouncement}><FontAwesomeIcon icon={faChevronRight} /></span>
                )}
            </div>
            
            <div className="main-header">
                <div className="header-mobile-left">
                    <button className="header-action-btn mobile-menu-trigger" onClick={onMobileMenuToggle}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <button className="header-action-btn mobile-search-btn" onClick={() => router.push('/products')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <div className="header-search">
                    <input 
                        type="text" 
                        placeholder="SEARCH" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>

                <Link href="/" className="logo-container" style={{ cursor: 'pointer' }}>
                    <img src="/logo.png" alt="SkinTalk" className="logo-img" />
                </Link>

                <div className="header-actions">
                    <div className="header-actions-group">
                        {user ? (
                            <button className="header-action-btn" onClick={onLogout} title="Logout">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </button>
                        ) : (
                            <button className="header-action-btn" onClick={onLoginClick} title="Login">
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                        )}
                        <button className="header-action-btn cart-trigger" onClick={onCartClick} style={{ position: 'relative' }}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                    </div>
                </div>
            </div>

            <div className="sub-header">
                <nav className="cat-nav">
                    {mounted && (
                        <ul className="cat-nav-links">
                            <li><Link href="/" className="cat-nav-link">Home</Link></li>
                            <li><Link href="/about" className="cat-nav-link">Our Story</Link></li>
                            <li><Link href="/products" className="cat-nav-link">Shop</Link></li>
                            <li><Link href="/#collections" className="cat-nav-link">Collection</Link></li>
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link 
                                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                                        className="cat-nav-link"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                            <li><Link href="/#about" className="cat-nav-link">About Us</Link></li>
                        </ul>
                    )}
                </nav>
            </div>
        </motion.header>
    );
}
