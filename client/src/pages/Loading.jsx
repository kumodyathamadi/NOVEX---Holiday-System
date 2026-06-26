import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
                className="absolute inset-0 z-0 overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0a1628 0%, #0d2b55 50%, #0a1628 100%)',
                }}
            >
                <img
                    src={loadingBg}
                    alt="background"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: 'auto',
                        minHeight: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center center',
                    }}
                />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="flex gap-4 mb-4">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            className="w-5 h-5 bg-white rounded-full shadow-lg"
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Loading;
