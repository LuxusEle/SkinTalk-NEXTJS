'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingBag, faBars, faUser, faSearch, faSignOutAlt, faLeaf, faUsers, faStar, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { getSupabase, isAdminEmail } from '@/lib/supabase';

export default function AboutPage() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        const supabase = getSupabase();
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            setIsAdmin(isAdminEmail(user?.email));
        });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        const supabase = getSupabase();
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <div style={{ background: '#fffcfd', minHeight: '100vh' }}>
            <motion.header className={`header ${scrolled ? 'scrolled' : ''}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
                <div className="container nav-content">
                    <div className="logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
                        <img src="/logo.png" alt="SkinTalk" style={{ height: 90, objectFit: 'contain' }} />
                    </div>
                    <nav className="nav-links">
                        <a onClick={() => router.push('/')} className="nav-link" style={{ cursor: 'pointer' }}>Home</a>
                        <a onClick={() => router.push('/products')} className="nav-link" style={{ cursor: 'pointer' }}>Shop</a>
                        <a onClick={() => router.push('/#collections')} className="nav-link" style={{ cursor: 'pointer' }}>Collections</a>
                    </nav>
                    <div className="nav-actions">
                        {user ? (
                            <button className="icon-btn" onClick={handleLogout} title="Logout"><FontAwesomeIcon icon={faSignOutAlt} /></button>
                        ) : (
                            <button className="icon-btn" onClick={() => router.push('/#login')} title="Login"><FontAwesomeIcon icon={faUser} /></button>
                        )}
                        <button className="icon-btn" onClick={() => router.push('/products')}><FontAwesomeIcon icon={faShoppingBag} /></button>
                        <button className="icon-btn mobile-menu-trigger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                </div>
            </motion.header>

            <main style={{ paddingTop: '140px', paddingBottom: '100px' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    
                    {/* Hero Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                    >
                        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>Our Story</h1>
                        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                            Skintalks was created with a simple idea: skincare should be easy to understand, honest, and accessible to everyone.
                        </p>
                    </motion.div>

                    {/* Timeline / Content Sections */}
                    <section style={{ marginBottom: '6rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>Where it all began</h2>
                                <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '1.5rem' }}>
                                    Founded in 2020, Skintalks began with a vision to simplify skincare and make effective products available to everyone. We saw that many people struggle to find products that truly suit their skin. With so many options in the market, skincare can often feel confusing and overwhelming.
                                </p>
                                <p style={{ lineHeight: '1.8', color: '#444' }}>
                                    We wanted to create products that speak to your skin, using carefully selected ingredients that are gentle, effective, and suitable for everyday use.
                                </p>
                            </div>
                            <div style={{ background: '#f9f9f9', padding: '3rem', borderRadius: '20px', textAlign: 'center' }}>
                                <FontAwesomeIcon icon={faLeaf} style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '1rem' }} />
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Pure Reset</h3>
                            </div>
                        </div>
                    </section>

                    <section style={{ marginBottom: '6rem', padding: '4rem', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)', border: '1px solid #f5f5f5' }}>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Our Approach</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                            <div style={{ padding: '2rem', background: '#fffcfd', borderRadius: '16px' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent)' }}>The Power of Herbs</h3>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#555' }}>
                                    We use powerful, locally sourced herbal ingredients, carefully selected to maintain authenticity and deliver real results. Our focus is on creating products that stay true to their roots while meeting modern skincare needs.
                                </p>
                            </div>
                            <div style={{ padding: '2rem', background: '#fffcfd', borderRadius: '16px' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent)' }}>Our Commitment</h3>
                                <ul style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#555', paddingLeft: '1.2rem' }}>
                                    <li>Preserving the authenticity of herbal skincare</li>
                                    <li>Using ingredients that are locally sourced and trusted</li>
                                    <li>Effective yet gentle for everyday use</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Founder Section */}
                    <section style={{ marginBottom: '6rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                             <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
                                <img src="/WhatsApp Image 2026-03-23 at 9.10.39 AM.jpeg" alt="Skintalks Vision" style={{ width: '100%', display: 'block' }} />
                             </div>
                             <div>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>Founder&apos;s Story</h2>
                                <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '1.5rem' }}>
                                    Skintalks was founded with a passion for creating something meaningful in the world of skincare. The journey began with a simple goal: to develop products that are practical, effective, and accessible, without unnecessary complexity.
                                </p>
                                <p style={{ lineHeight: '1.8', color: '#444' }}>
                                    Through hands-on experience in product development and understanding what customers truly need, the vision for Skintalks slowly came to life. Every product is created with care, keeping in mind real skin concerns faced every day.
                                </p>
                             </div>
                        </div>
                    </section>

                    {/* Beliefs Grid */}
                    <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '3rem' }}>What We Believe</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                            {[
                                { icon: faBars, title: "Simplicity", desc: "Skincare should not be complicated" },
                                { icon: faStar, title: "Quality", desc: "Good quality should be affordable" },
                                { icon: faLeaf, title: "Heritage", desc: "The power of herbs should be preserved" },
                                { icon: faUser, title: "Confidence", desc: "Everyone deserves to feel confident" }
                            ].map((item, i) => (
                                <div key={i} style={{ padding: '2rem', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
                                    <FontAwesomeIcon icon={item.icon} style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.5rem' }} />
                                    <h4 style={{ marginBottom: '0.5rem' }}>{item.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#888' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final CTA/Promise */}
                    <section style={{ textAlign: 'center', padding: '5rem 0', background: 'var(--accent)', borderRadius: '30px', color: '#fff' }}>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Promise</h2>
                        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
                            We are committed to creating products that are gentle, effective, and fit into your daily routine. Skintalks is more than skincare—it&apos;s a conversation with your skin.
                        </p>
                        <button 
                            onClick={() => router.push('/products')} 
                            style={{ 
                                padding: '1.2rem 3rem', 
                                background: '#fff', 
                                color: 'var(--accent)', 
                                border: 'none', 
                                borderRadius: '50px', 
                                fontWeight: '600', 
                                cursor: 'pointer',
                                fontSize: '1.1rem'
                            }}
                        >
                            Explore Collection
                        </button>
                    </section>
                </div>
            </main>

            <footer className="footer">
                <div className="container footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo"><span className="logo-text">SkinTalk</span><span className="logo-tagline">Clean Beauty Ethics</span></div>
                        <p style={{ color: '#777', fontSize: '0.95rem', maxWidth: 350 }}>Redefining the standard of clean beauty with products that deliver visible results without compromise.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Explore</h4>
                        <ul>
                            <li><a onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>Home</a></li>
                            <li><a onClick={() => router.push('/products')} style={{ cursor: 'pointer' }}>Shop</a></li>
                            <li><a onClick={() => router.push('/about')} style={{ cursor: 'pointer' }}>Our Story</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <ul>
                            <li><a onClick={() => router.push('/terms')} style={{ cursor: 'pointer' }}>Terms & Conditions</a></li>
                            <li><a href="mailto:sales@skintalks.lk">Email Us</a></li>
                            <li><a href="https://wa.me/94767678984" target="_blank">WhatsApp Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-newsletter">
                        <h4>Stay Radiant</h4>
                        <p>Sign up for exclusive beauty tips and early access to drops.</p>
                        <div className="newsletter-form"><input type="email" placeholder="Email Address" /><button className="hero-cta">Join</button></div>
                    </div>
                </div>
                <div className="container footer-bottom">&copy; 2026 SkinTalk Cosmetics. Artfully Crafted.</div>
            </footer>
        </div>
    );
}
