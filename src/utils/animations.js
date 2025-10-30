// src/utils/animations.js

/**
 * Animation utilities for React components
 * These can be used with Framer Motion or CSS transitions
 */

// Fade animations
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
};

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
};

export const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4 }
};

export const fadeInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.4 }
};

export const fadeInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4 }
};

// Scale animations
export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3 }
};

export const scaleUp = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { duration: 0.3, type: 'spring', stiffness: 200 }
};

// Slide animations
export const slideInFromBottom = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
};

export const slideInFromTop = {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
};

export const slideInFromLeft = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
};

export const slideInFromRight = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
};

// Rotate animations
export const rotateIn = {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
    transition: { duration: 0.5 }
};

// Bounce animation
export const bounceIn = {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
    }
};

// Stagger children animation
export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

// Modal/Dialog animations
export const modalOverlay = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
};

export const modalContent = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: { duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }
};

// Card animations
export const cardHover = {
    rest: { scale: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hover: {
        scale: 1.02,
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
        transition: { duration: 0.2 }
    }
};

// Button animations
export const buttonTap = {
    tap: { scale: 0.95 },
    transition: { duration: 0.1 }
};

// Page transition animations
export const pageTransition = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3 }
};

// Toast/Notification animations
export const toastAnimation = {
    initial: { opacity: 0, y: -50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.5 },
    transition: { duration: 0.3, ease: 'easeOut' }
};

// Drawer/Sidebar animations
export const drawerAnimation = (direction = 'left') => ({
    initial: {
        x: direction === 'left' ? '-100%' : '100%',
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1
    },
    exit: {
        x: direction === 'left' ? '-100%' : '100%',
        opacity: 0
    },
    transition: { duration: 0.3, ease: 'easeInOut' }
});

// Loader animations
export const loaderPulse = {
    animate: {
        scale: [1, 1.1, 1],
        opacity: [1, 0.7, 1]
    },
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
    }
};

export const loaderSpin = {
    animate: {
        rotate: 360
    },
    transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
    }
};

// Accordion animations
export const accordionAnimation = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' }
};

// Dropdown menu animations
export const dropdownAnimation = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
    transition: { duration: 0.2 }
};

// Tooltip animations
export const tooltipAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.15 }
};

// Skeleton loading animation
export const skeletonPulse = {
    animate: {
        opacity: [0.5, 1, 0.5]
    },
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
    }
};

// CSS class utilities for animations
export const animationClasses = {
    fadeIn: 'animate-fadeIn',
    fadeOut: 'animate-fadeOut',
    slideInRight: 'animate-slideInRight',
    slideInLeft: 'animate-slideInLeft',
    slideInUp: 'animate-slideInUp',
    slideInDown: 'animate-slideInDown',
    scaleIn: 'animate-scaleIn',
    scaleOut: 'animate-scaleOut',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    ping: 'animate-ping',
    float: 'animate-float',
    blob: 'animate-blob',
    shimmer: 'animate-shimmer'
};

// Duration helpers
export const animationDuration = {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8
};

// Easing functions
export const easings = {
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    spring: { type: 'spring', stiffness: 300, damping: 25 }
};

// Helper function to create custom animation
export const createAnimation = (config) => ({
    initial: config.initial || { opacity: 0 },
    animate: config.animate || { opacity: 1 },
    exit: config.exit || { opacity: 0 },
    transition: {
        duration: config.duration || 0.3,
        ease: config.ease || 'easeOut',
        delay: config.delay || 0,
        ...config.transition
    }
});

// Helper to add delay to animations
export const withDelay = (animation, delay) => ({
    ...animation,
    transition: {
        ...animation.transition,
        delay
    }
});

// Helper to create staggered animations for lists
export const createStaggeredList = (itemAnimation, staggerDelay = 0.1) => ({
    container: {
        initial: {},
        animate: {
            transition: {
                staggerChildren: staggerDelay
            }
        }
    },
    item: itemAnimation
});

export default {
    fadeIn,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    scaleUp,
    slideInFromBottom,
    slideInFromTop,
    slideInFromLeft,
    slideInFromRight,
    rotateIn,
    bounceIn,
    staggerContainer,
    staggerItem,
    modalOverlay,
    modalContent,
    cardHover,
    buttonTap,
    pageTransition,
    toastAnimation,
    drawerAnimation,
    loaderPulse,
    loaderSpin,
    accordionAnimation,
    dropdownAnimation,
    tooltipAnimation,
    skeletonPulse,
    animationClasses,
    animationDuration,
    easings,
    createAnimation,
    withDelay,
    createStaggeredList
};