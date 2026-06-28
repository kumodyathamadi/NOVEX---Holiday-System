import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Home.css';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaUtensils, FaSun, FaPlane, FaFilm, FaStar, FaGift,
  FaSun as FaSunIcon, FaMoon, FaPalette, FaUser, FaSignOutAlt,
  FaBell, FaChevronDown, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaGlobe, FaHeart, FaFacebook, FaInstagram, FaTwitter, FaYoutube,
  FaArrowRight, FaFire, FaClock, FaTag, FaCog, FaQuestionCircle,
  FaInfoCircle, FaGamepad, FaCommentDots, FaLifeRing, FaBars, FaTimes
} from 'react-icons/fa';
import { GiPalmTree, GiSunrise } from 'react-icons/gi';
import { MdLocalActivity, MdFestival } from 'react-icons/md';

// Images
import foodHubImg from '../assets/card_food_hub.png';
import dayoutImg from '../assets/card_dayout.png';
import travelImg from '../assets/card_travel.png';
import moviesImg from '../assets/card_movies.png';
import functionsImg from '../assets/card_functions.png';
import logoImg from '../assets/logooo.jpeg';

import LiquidCursor from '../components/LiquidCursor';
import TypewriterText from '../components/TypewriterText';
import MoodSelector from '../components/MoodSelector';
import StatsCounter from '../components/StatsCounter';
import DealsBanner from '../components/DealsBanner';

/* ─────────────────────────────────────
   Card Data
───────────────────────────────────── */
const SERVICES = [
  {
    id: 'food-hub',
    label: 'FOOD HUB',
    subtitle: 'Taste the best cuisines',
    icon: <FaUtensils />,
    img: foodHubImg,
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
    glow: '0 0 40px rgba(255,107,53,0.6)',
    tag: 'HOT',
    tagColor: '#FF6B35',
    count: '200+ Restaurants',
  },
  {
    id: 'dayout',
    label: 'DAYOUT',
    subtitle: 'Plan your perfect day',
    icon: <GiSunrise />,
    img: dayoutImg,
    gradient: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
    glow: '0 0 40px rgba(0,180,219,0.6)',
    tag: 'NEW',
    tagColor: '#00B4DB',
    count: '50+ Activities',
  },
  {
    id: 'travel',
    label: 'TRAVEL',
    subtitle: 'Explore Sri Lanka',
    icon: <FaPlane />,
    img: travelImg,
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    glow: '0 0 40px rgba(86,171,47,0.6)',
    tag: 'TOP',
    tagColor: '#56ab2f',
    count: '100+ Destinations',
  },
  {
    id: 'movies',
    label: 'MOVIE THEATERS',
    subtitle: 'Cinematic experiences',
    icon: <FaFilm />,
    img: moviesImg,
    gradient: 'linear-gradient(135deg, #7B2FF7 0%, #F107A3 100%)',
    glow: '0 0 40px rgba(123,47,247,0.6)',
    tag: 'NOW',
    tagColor: '#7B2FF7',
    count: '20+ Theaters',
  },
  {
    id: 'functions',
    label: 'FUNCTIONS',
    subtitle: 'Book premium venues',
    icon: <MdFestival />,
    img: functionsImg,
    gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
    glow: '0 0 40px rgba(245,175,25,0.6)',
    tag: 'VIP',
    tagColor: '#f5af19',
    count: '30+ Venues',
  },
  {
    id: 'offers',
    label: 'OFFERS',
    subtitle: 'Exclusive deals for you',
    icon: <FaGift />,
    img: null,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    glow: '0 0 40px rgba(229,57,53,0.6)',
    tag: 'SALE',
    tagColor: '#e53935',
    count: '500+ Deals',
    isOffers: true,
  },
];

const THEMES = [
  { id: 'theme-blue', color: '#0056CC', label: 'Blue' },
  { id: 'theme-green', color: '#00695C', label: 'Green' },
  { id: 'theme-purple', color: '#6A1B9A', label: 'Purple' },
];

/* ─────────────────────────────────────
   Tilt Card Hook
───────────────────────────────────── */
function useTilt() {
  const ref = useRef(null);
  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -10;
    const ry = ((x - cx) / cx) * 10;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    }
  }, []);
  return { ref, handleMouseMove, handleMouseLeave };
}

/* ─────────────────────────────────────
   Service Card
───────────────────────────────────── */
const ServiceCard = ({ service, index, mode }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="service-card-wrapper"
      style={{ '--glow': service.glow }}
    >
      <div
        ref={ref}
        className={`service-card ${mode}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ '--card-gradient': service.gradient }}
      >
        {/* Ripple Effects */}
        {ripples.map(r => (
          <span key={r.id} className="ripple" style={{ left: r.x, top: r.y }} />
        ))}

        {/* Image / Offers BG */}
        {service.img ? (
          <div className="card-img-wrap">
            <img src={service.img} alt={service.label} className="card-img" />
            <div className="card-img-overlay" />
          </div>
        ) : (
          <div className="card-offers-bg">
            <div className="offers-orbit" />
            <div className="offers-orbit offers-orbit-2" />
            <div className="offers-glow-circle" />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="offers-star"
                style={{
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  fontSize: `${12 + (i % 3) * 8}px`,
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✦
              </motion.div>
            ))}
            <div className="offers-percent">
              <span>UP</span>
              <span className="big-pct">60%</span>
              <span>OFF</span>
            </div>
          </div>
        )}

        {/* Tag Badge */}
        <div className="card-tag" style={{ '--tag-c': service.tagColor }}>
          {service.tag}
        </div>

        {/* Content */}
        <div className="card-content">
          <div className="card-icon-wrap">
            {service.icon}
          </div>
          <div className="card-text">
            <h3 className="card-title">{service.label}</h3>
            <p className="card-subtitle">{service.subtitle}</p>
            <div className="card-meta">
              <span className="card-count">{service.count}</span>
              <span className="card-arrow">
                <FaArrowRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────
   Main Home Component
───────────────────────────────────── */
const Home = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'dark');
  const [theme, setTheme] = useState(localStorage.getItem('selectedTheme') || 'theme-blue');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [isDarkToggling, setIsDarkToggling] = useState(false);
  const [greeting, setGreeting] = useState('');
  const userName = localStorage.getItem('registeredUser') || 'Traveler';

  const [currentSlide, setCurrentSlide] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const heroSlides = [travelImg, dayoutImg, foodHubImg, moviesImg];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selectedTheme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(s => (s + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.hd-dropdown-root')) {
        setAccountOpen(false);
        setThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleMode = () => {
    setIsDarkToggling(true);
    setTimeout(() => {
      setMode(m => m === 'dark' ? 'light' : 'dark');
      setIsDarkToggling(false);
    }, 200);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const isDark = mode === 'dark';

  return (
    <div className={`hd-root ${isDark ? 'hd-dark' : 'hd-light'} ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <LiquidCursor />
      {/* Animated BG */}
      <div className="hd-bg-layer">
        <div className="hd-blob blob-1" />
        <div className="hd-blob blob-2" />
        <div className="hd-blob blob-3" />
        <canvas id="particle-canvas" className="particle-canvas" />
      </div>

      {/* Mode toggle overlay */}
      <AnimatePresence>
        {isDarkToggling && (
          <motion.div
            className="mode-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <motion.nav
        className={`hd-nav ${scrolled ? 'hd-nav-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-4">
          <button 
            className="hd-sidebar-toggle hd-btn hd-btn-icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          {/* Logo */}
          <motion.div
            className="hd-logo"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img src={logoImg} alt="Holiday.lk Logo" className="hd-company-logo" />
          </motion.div>
        </div>

        {/* Nav Center: greeting pill */}
        <motion.div
          className="hd-nav-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="hd-greeting-pill">
            ✨ {greeting}, {userName.split(' ')[0]}!
          </span>
        </motion.div>

        {/* Right Controls */}
        <motion.div
          className="hd-nav-right"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Theme Picker */}
          <div className="hd-dropdown-root">
            <button
              className="hd-btn hd-btn-icon"
              id="theme-btn"
              onClick={() => { setThemeOpen(o => !o); setAccountOpen(false); }}
              title="Themes"
            >
              <FaPalette />
            </button>
            <AnimatePresence>
              {themeOpen && (
                <motion.div
                  className="hd-dropdown"
                  initial={{ opacity: 0, y: -12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.92 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <p className="hd-dd-label">Choose Theme</p>
                  <div className="hd-theme-dots">
                    {THEMES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id); setThemeOpen(false); }}
                        className={`hd-theme-dot ${theme === t.id ? 'active' : ''}`}
                        style={{ background: t.color }}
                        title={t.label}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mode Toggle */}
          <button
            className="hd-btn hd-mode-toggle"
            id="mode-toggle"
            onClick={toggleMode}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            <motion.span
              key={mode}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'backOut' }}
            >
              {isDark ? <FaSunIcon style={{ color: '#fbbf24' }} /> : <FaMoon style={{ color: '#6366f1' }} />}
            </motion.span>
          </button>

          {/* Account */}
          <div className="hd-dropdown-root">
            <button
              className="hd-btn hd-account-btn"
              id="account-btn"
              onClick={() => { setAccountOpen(o => !o); setThemeOpen(false); }}
            >
              <div className="hd-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="hd-account-name">{userName.split(' ')[0]}</span>
              <motion.span
                animate={{ rotate: accountOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <FaChevronDown size={10} />
              </motion.span>
            </button>
            <AnimatePresence>
              {accountOpen && (
                <motion.div
                  className="hd-dropdown hd-dropdown-right"
                  initial={{ opacity: 0, y: -12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.92 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <div className="hd-dd-profile">
                    <div className="hd-dd-avatar">{userName.charAt(0).toUpperCase()}</div>
                    <div>
                      <p className="hd-dd-name">{userName}</p>
                      <p className="hd-dd-role">Premium Member</p>
                    </div>
                  </div>
                  <div className="hd-dd-divider" />
                  {[
                    { icon: <FaUser />, label: 'My Profile' },
                    { icon: <FaHeart />, label: 'My Favourites' },
                    { icon: <FaBell />, label: 'Notifications' },
                  ].map(item => (
                    <button key={item.label} className="hd-dd-item">
                      <span className="hd-dd-item-icon">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                  <div className="hd-dd-divider" />
                  <button className="hd-dd-item hd-dd-logout" onClick={handleLogout}>
                    <span className="hd-dd-item-icon"><FaSignOutAlt /></span>
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── SIDEBAR ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="hd-sidebar"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hd-sidebar-inner">
              <div className="hd-sidebar-menu">
                <button className="hd-sidebar-item"><FaCog className="hd-sb-icon"/> Account Settings</button>
                <button className="hd-sidebar-item"><FaQuestionCircle className="hd-sb-icon"/> FAQ</button>
                <button className="hd-sidebar-item"><FaInfoCircle className="hd-sb-icon"/> About us</button>
                <button className="hd-sidebar-item"><FaGift className="hd-sb-icon"/> My Offers</button>
                <button className="hd-sidebar-item"><FaBell className="hd-sb-icon"/> Updates</button>
                <button className="hd-sidebar-item"><FaGamepad className="hd-sb-icon"/> Play and Earn</button>
                <button className="hd-sidebar-item"><FaCommentDots className="hd-sb-icon"/> Feedback</button>
                <button className="hd-sidebar-item"><FaLifeRing className="hd-sb-icon"/> HELP</button>
              </div>
              
              <div className="hd-sidebar-bottom">
                <button className="hd-sidebar-item hd-sb-logout" onClick={handleLogout}>
                  <FaSignOutAlt className="hd-sb-icon"/> Log Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hd-main-content">
        {/* ── HERO ── */}
      <motion.div className="hd-hero" style={{ y: heroY }}>
        <div className="hd-hero-inner">
          <motion.div
            className="hd-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hd-hero-tag">
            <FaFire /> &nbsp;Sri Lanka's #1 Lifestyle Platform
          </div>
          <h1 className="hd-hero-title">
            Discover Unforgettable<br />
            <TypewriterText />
          </h1>
          <p className="hd-hero-sub">
            Food, travel, movies, events - all in one place. Your next adventure begins here.
          </p>
          <div className="hd-hero-stats">
            {[['10K+', 'Happy Users'], ['500+', 'Deals'], ['100+', 'Destinations']].map(([n, l]) => (
              <div key={l} className="hd-stat">
                <span className="hd-stat-num">{n}</span>
                <span className="hd-stat-lbl">{l}</span>
              </div>
            ))}
            </div>
          </motion.div>

          <motion.div 
            className="hd-hero-slideshow"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <AnimatePresence mode='wait'>
              <motion.img
                key={currentSlide}
                src={heroSlides[currentSlide]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="hd-hero-slide-img"
                alt="Highlight"
              />
            </AnimatePresence>
            <div className="hd-slide-overlay" />
            <div className="hd-slide-indicators">
              {heroSlides.map((_, i) => (
                <button 
                  key={i} 
                  className={`hd-slide-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating decorative icons */}
        <div className="hd-hero-deco" aria-hidden>
          {[
            { icon: <FaPlane />, style: { top: '10%', right: '12%' }, delay: 0 },
            { icon: <GiPalmTree />, style: { top: '55%', right: '5%' }, delay: 1.2 },
            { icon: <FaUtensils />, style: { top: '30%', right: '22%' }, delay: 0.6 },
            { icon: <FaStar />, style: { top: '70%', right: '18%' }, delay: 1.8 },
          ].map((d, i) => (
            <motion.div
              key={i}
              className="hd-deco-icon"
              style={d.style}
              animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
            >
              {d.icon}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── SERVICES GRID ── */}
      <section className="hd-section">
        <motion.div
          className="hd-section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="hd-section-title">Our Services</h2>
          <p className="hd-section-sub">Everything you love, right at your fingertips</p>
        </motion.div>

        <div className="hd-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} mode={mode} />
          ))}
        </div>
      </section>

      {/* ── MOOD SELECTOR ── */}
      <MoodSelector />

      {/* ── SUMMER DEALS BANNER ── */}
      <DealsBanner />

      {/* ── STATS COUNTER ── */}
      <StatsCounter />

      {/* ── FOOTER ── */}
      <motion.footer
        className="hd-footer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="hd-footer-inner">
          <div className="hd-footer-brand">
            <div className="hd-footer-logo">
              <img src={logoImg} alt="Holiday.lk Logo" className="hd-company-logo-footer" />
            </div>
            <p className="hd-footer-tagline">Sri Lanka's Premier Travel & Lifestyle Platform</p>
            <div className="hd-footer-socials">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <motion.a key={i} href="#" className="hd-social-btn" whileHover={{ scale: 1.2, y: -3 }}>
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="hd-footer-links">
            <h4>Quick Links</h4>
            <ul>
              {['Food Hub', 'Dayout', 'Travel', 'Movie Theaters', 'Functions', 'Offers'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="hd-footer-contact">
            <h4>Contact Us</h4>
            <div className="hd-contact-item">
              <FaGlobe className="hd-contact-icon" />
              <a href="http://www.holiday.lk" target="_blank" rel="noreferrer">www.holiday.lk</a>
            </div>
            <div className="hd-contact-item">
              <FaEnvelope className="hd-contact-icon" />
              <a href="mailto:holiday.lk@gmail.com">holiday.lk@gmail.com</a>
            </div>
            <div className="hd-contact-item">
              <FaPhone className="hd-contact-icon" />
              <span>0000000000</span>
            </div>
            <div className="hd-contact-item">
              <FaMapMarkerAlt className="hd-contact-icon" />
              <span>Homagama, Colombo Rd</span>
            </div>
          </div>
        </div>

        <div className="hd-footer-bottom">
          <p>© 2025 Holiday.lk · All rights reserved · Made with <FaHeart className="hd-heart" /> in Sri Lanka</p>
        </div>
      </motion.footer>
      </div> {/* End .hd-main-content */}
    </div>
  );
};

export default Home;
