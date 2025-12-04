import { cn } from '@/lib/utils';
import { Text, TextProps } from 'react-native';

export function ThemedText({ className, ...props }: TextProps) {
    return <Text className={cn("text-ink font-sans text-base", className)} {...props} />;
}
