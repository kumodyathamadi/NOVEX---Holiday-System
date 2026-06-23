import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlane } from 'react-icons/fa';
import loadingBg from '../assets/loading-bg.png';

const Loading = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const nextPath = queryParams.get('to') || '/register';

        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(interval);
                    return 100;
                }
                const diff = Math.random() * 20;
                return Math.min(oldProgress + diff, 100);
            });
        }, 300);

        const timer = setTimeout(() => {
            navigate(nextPath);
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [navigate]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 z-0"
                style={{ 
                    backgroundImage: `url(${loadingBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 text-white text-6xl font-bold tracking-tighter"
                >
                    Holiday<span className="text-primary">.lk</span>
                </motion.div>

                <motion.div
                    animate={{ 
                        x: [0, 200],
                        y: [0, -50],
                        rotate: [0, -10]
                    }}
                    transition={{ 
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity 
                    }}
                    className="text-white text-4xl mb-12"
                >
                    <FaPlane />
                </motion.div>

                <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4">
                    <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white font-medium tracking-wide"
                >
                    Preparing your dream vacation...
                </motion.p>
            </div>
        </motion.div>
    );
};

export default Loading;
