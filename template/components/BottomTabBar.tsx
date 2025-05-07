import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BottomTabBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View className="flex-row justify-around items-center bg-white border-t border-gray-200 py-2">
            <TouchableOpacity className="items-center" onPress={() => router.push('/home')}>
                <Ionicons name="home" size={24} color={pathname === '/home' ? '#3b82f6' : '#9ca3af'} />
                <Text className={pathname === '/home' ? 'text-primary text-xs mt-1' : 'text-gray-400 text-xs mt-1'}>Home</Text>
            </TouchableOpacoty>
            <TouchableOpacity className="items-center" onPress={() => router.push('/product/create')}>
                <Ionicons name="add" size={24} color="white" />
                <Text className="text-gray-400 text-x mt-1">Create</Text>
            </TouchableOpacoty>
        </View>
    );
};

export default BottomTabBar;