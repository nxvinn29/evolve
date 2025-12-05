import { cn } from '@/lib/utils';
import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    variant?: 'default' | 'glass' | 'outline';
}

export function Card({ style, className, variant = 'glass', ...props }: CardProps) {
    return (
        <View
            className={cn(
                'rounded-2xl p-6',
                variant === 'default' && 'bg-stone-800 border border-stone-700',
                variant === 'glass' && 'bg-black/30 border border-white/10 backdrop-blur-md',
                variant === 'outline' && 'bg-transparent border border-stone-600',
                className
            )}
            {...props}
        />
    );
}
