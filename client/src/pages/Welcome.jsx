import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaPlaneDeparture, FaCloud } from 'react-icons/fa';

const Welcome = () => {
    const navigate = useNavigate();

    const destinations = [
        { name: 'Ella', img: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=300&q=80' },
        { name: 'Galle', img: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=300&q=80' },
        { name: 'Kandy', img: 'https://images.unsplash.com/photo-1581432194689-f59798544c4c?auto=format&fit=crop&w=300&q=80' }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-8 overflow-hidden relative"
        >
            {/* Animated Clouds */}
            <motion.div 
                animate={{ x: [-100, 1200] }} 
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-20 text-white/40 text-8xl"
            >
                <FaCloud />
            </motion.div>
            <motion.div 
                animate={{ x: [1200, -100] }} 
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute top-60 text-white/20 text-9xl"
            >
                <FaCloud />
            </motion.div>

            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass max-w-4xl w-full p-12 text-center bg-white/60 relative z-10"
            >
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-primary text-6xl mb-6 flex justify-center"
                >
                    <FaPlaneDeparture />
                </motion.div>

                <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Holiday.lk</h1>
                <p className="text-xl text-gray-600 mb-12 italic">"Your adventure begins here."</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {destinations.map((dest, index) => (
                        <motion.div 
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 * index }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg group pointer-events-auto"
                        >
                            <img src={dest.img} alt={dest.name} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{dest.name}</h3>
                                <p className="text-sm text-gray-500">Must visit</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <button 
                    onClick={() => navigate('/login')}
                    className="btn-primary text-lg px-12 py-4"
                >
                    Continue
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Welcome;
