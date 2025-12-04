import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface ResponsiveValues {
    width: number;
    height: number;
    isSmallDevice: boolean;
    isMediumDevice: boolean;
    isLargeDevice: boolean;
    scale: (size: number) => number;
    verticalScale: (size: number) => number;
    moderateScale: (size: number, factor?: number) => number;
}

const baseWidth = 375; // iPhone SE width as base
const baseHeight = 667;

export const useResponsive = (): ResponsiveValues => {
    const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window }: { window: ScaledSize }) => {
                setDimensions(window);
            }
        );

        return () => subscription?.remove();
    }, []);

    const { width, height } = dimensions;

    // Device size categories
    const isSmallDevice = width < 375;
    const isMediumDevice = width >= 375 && width < 768;
    const isLargeDevice = width >= 768;

    // Scaling functions
    const scale = (size: number) => (width / baseWidth) * size;
    const verticalScale = (size: number) => (height / baseHeight) * size;
    const moderateScale = (size: number, factor: number = 0.5) =>
        size + (scale(size) - size) * factor;

    return {
        width,
        height,
        isSmallDevice,
        isMediumDevice,
        isLargeDevice,
        scale,
        verticalScale,
        moderateScale,
    };
};

// Helper function to get responsive font size
export const getResponsiveFontSize = (size: number): number => {
    const { width } = Dimensions.get('window');
    const scale = width / baseWidth;
    const newSize = size * scale;
    return Math.round(newSize);
};

// Helper function to get responsive spacing
export const getResponsiveSpacing = (size: number): number => {
    const { width } = Dimensions.get('window');
    const scale = width / baseWidth;
    const newSize = size * scale;
    return Math.round(newSize);
};
