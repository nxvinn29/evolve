import { cn } from '@/lib/utils';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    textClassName?: string;
}

export function Button({ title, variant = 'primary', className, textClassName, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            className={cn(
                "p-4 rounded-lg items-center justify-center active:opacity-80",
                variant === 'primary' && "bg-terracotta",
                variant === 'secondary' && "bg-gold",
                variant === 'outline' && "border border-ink bg-transparent",
                className
            )}
            {...props}
        >
            <Text className={cn(
                "font-serif text-lg font-bold",
                variant === 'primary' ? "text-parchment" : "text-ink",
                textClassName
            )}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
