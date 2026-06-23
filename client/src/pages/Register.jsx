import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import bluePlantIllustration from '../assets/blue-plant-illustration.png';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering:', formData);
        navigate('/welcome');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-[#E0F2FE] via-[#F0F9FF] to-[#DBEAFE] font-poppins relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-200/40 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-sky-100/50 rounded-full blur-[100px]" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col lg:flex-row w-full max-w-5xl bg-white/30 backdrop-blur-3xl rounded-[3rem] border border-white/50 shadow-2xl overflow-hidden"
            >
                {/* Form Section */}
                <div className="w-full lg:w-3/5 p-8 md:p-14 flex flex-col justify-center">
                    <div className="mb-10 text-center lg:text-left">
                        <motion.h2 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-4xl font-bold text-blue-900 mb-2"
                        >
                            Sign Up
                        </motion.h2>
                        <p className="text-blue-600/70 text-sm font-medium uppercase tracking-widest">Start your journey today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputLine 
                                icon={<FaUser />} 
                                label="User name" 
                                name="fullName" 
                                type="text" 
                                placeholder="Your full name" 
                                onChange={handleChange} 
                            />
                            <InputLine 
                                icon={<FaPhone />} 
                                label="Phone" 
                                name="phone" 
                                type="tel" 
                                placeholder="+94 XX XXX XXXX" 
                                onChange={handleChange} 
                            />
                        </div>

                        <InputLine 
                            icon={<FaEnvelope />} 
                            label="Email" 
                            name="email" 
                            type="email" 
                            placeholder="name@example.com" 
                            onChange={handleChange} 
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <InputLine 
                                    icon={<FaLock />} 
                                    label="Password" 
                                    name="password" 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    onChange={handleChange} 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 bottom-2 text-blue-400 hover:text-blue-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <InputLine 
                                icon={<FaLock />} 
                                label="Confirm Password" 
                                name="confirmPassword" 
                                type="password" 
                                placeholder="••••••••" 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="pt-8 flex flex-col items-center">
                            <button 
                                type="submit" 
                                className="w-full md:w-64 py-4 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-lg shadow-xl shadow-blue-200 hover:shadow-blue-400/40 transition-all transform hover:scale-105 active:scale-95"
                            >
                                Sign Up
                            </button>
                            
                            <p className="mt-8 text-sm font-medium text-blue-600/70">
                                Already Have Account? <Link to="/login" className="text-blue-800 font-bold hover:underline">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Illustration Section */}
                <div className="hidden lg:flex w-2/5 relative bg-gradient-to-br from-blue-700 to-sky-900 items-center justify-center">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
                    </div>
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 w-full p-10"
                    >
                        <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-4 border border-white/20 shadow-2xl">
                            <img 
                                src={bluePlantIllustration} 
                                alt="Illustration" 
                                className="w-full rounded-[2.5rem] shadow-inner"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

const InputLine = ({ icon, label, name, type, placeholder, onChange }) => (
    <div className="relative border-b-2 border-blue-100/50 focus-within:border-blue-500 transition-all pb-2 group">
        <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest pl-1 block mb-1">{label}</label>
        <div className="flex items-center gap-3">
            <input 
                type={type} 
                name={name}
                placeholder={placeholder}
                required
                onChange={onChange}
                className="w-full bg-transparent text-blue-900 placeholder-blue-300 focus:outline-none font-medium py-1"
            />
            <div className="text-blue-300 group-focus-within:text-blue-500 transition-colors pr-1">
                {icon}
            </div>
        </div>
    </div>
);

export default Register;
