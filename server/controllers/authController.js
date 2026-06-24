import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
    try {
        const { fullName, email, password, phone, birthday } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            fullName,
            email,
            phone,
            birthday,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // Requirement: Do not reveal if email exists
            return res.status(200).json({ success: true, message: 'Email sent' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 mins

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        // In a real app, you would use nodemailer here. 
        // For this task, we return the link for testing.
        const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
        console.log('Reset URL:', resetUrl);

        res.status(200).json({
            success: true,
            message: 'If an account exists, a reset link has been sent.',
            debugToken: resetToken // Only for development/testing
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.body.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid or expired token' });
        }

        // Set new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (err) {
        next(err);
    }
};
