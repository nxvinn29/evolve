import { cn } from '@/lib/utils';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ScreenWrapper({ className, children, ...props }: ViewProps) {
    return (
        <SafeAreaView className="flex-1 bg-parchment" edges={['top', 'left', 'right']}>
            <View className={cn("flex-1 px-4", className)} {...props}>
                {children}
            </View>
        </SafeAreaView>
    );
}
