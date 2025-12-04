import { Dimensions } from 'react-native';

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 800,
} as const;

// Animation easing presets
export const ANIMATION_EASING = {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'spring',
} as const;

// Fade animations
export const fadeIn = {
    from: { opacity: 0 },
    to: { opacity: 1 },
};

export const fadeOut = {
    from: { opacity: 1 },
    to: { opacity: 0 },
};

// Slide animations
export const slideInFromRight = {
    from: { transform: [{ translateX: Dimensions.get('window').width }] },
    to: { transform: [{ translateX: 0 }] },
};

export const slideInFromLeft = {
    from: { transform: [{ translateX: -Dimensions.get('window').width }] },
    to: { transform: [{ translateX: 0 }] },
};

export const slideInFromBottom = {
    from: { transform: [{ translateY: Dimensions.get('window').height }] },
    to: { transform: [{ translateY: 0 }] },
};

export const slideInFromTop = {
    from: { transform: [{ translateY: -Dimensions.get('window').height }] },
    to: { transform: [{ translateY: 0 }] },
};

// Scale animations
export const scaleIn = {
    from: { transform: [{ scale: 0 }] },
    to: { transform: [{ scale: 1 }] },
};

export const scaleOut = {
    from: { transform: [{ scale: 1 }] },
    to: { transform: [{ scale: 0 }] },
};

export const pulse = {
    from: { transform: [{ scale: 1 }] },
    to: { transform: [{ scale: 1.05 }] },
};

// Rotation animations
export const rotate = {
    from: { transform: [{ rotate: '0deg' }] },
    to: { transform: [{ rotate: '360deg' }] },
};

// Combined animations
export const fadeInScale = {
    from: { opacity: 0, transform: [{ scale: 0.8 }] },
    to: { opacity: 1, transform: [{ scale: 1 }] },
};

export const fadeInSlideUp = {
    from: { opacity: 0, transform: [{ translateY: 50 }] },
    to: { opacity: 1, transform: [{ translateY: 0 }] },
};

// Breathing animation (for meditation)
export const breathingAnimation = {
    from: { transform: [{ scale: 1 }], opacity: 0.7 },
    to: { transform: [{ scale: 1.1 }], opacity: 1 },
};

// Lotus bloom animation
export const lotusBloom = {
    from: { transform: [{ scale: 0.5 }, { rotate: '-45deg' }], opacity: 0 },
    to: { transform: [{ scale: 1 }, { rotate: '0deg' }], opacity: 1 },
};

// Stagger delay for multiple items
export const getStaggerDelay = (index: number, baseDelay: number = 100) => {
    return index * baseDelay;
};
