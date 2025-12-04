import { cn } from '@/lib/utils';
import { View, ViewProps } from 'react-native';

export function Card({ className, ...props }: ViewProps) {
    return (
        <View
            className={cn(
                "bg-parchment p-4 rounded-xl border border-ink/10 shadow-sm",
                className
            )}
            {...props}
        />
    );
}
