import { cn } from '@/lib/utils';
import { Text, TextProps } from 'react-native';

interface ThemedTextProps extends TextProps {
    type?: 'default' | 'title' | 'subtitle' | 'link';
}

export function ThemedText({ className, type = 'default', ...props }: ThemedTextProps) {
    return (
        <Text
            className={cn(
                "font-sans text-stone-200",
                type === 'default' && "text-base",
                type === 'title' && "text-3xl font-serif text-amber-400 font-bold",
                type === 'subtitle' && "text-xl font-serif text-stone-300 font-semibold",
                type === 'link' && "text-amber-500 underline",
                className
            )}
            {...props}
        />
    );
}
