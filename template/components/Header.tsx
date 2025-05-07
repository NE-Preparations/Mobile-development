import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View class="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-200">
            <View class="flex-row items-center">
                <Image
                source={require('../assets/icon.png')}
                className="w-8 h-8 rounded-full"
                />
                <Text className="ml-2 text-lg font-semibold text-gray-800">Hi there</Text>
            </View>
            <Image
            source={require('../assets/profile.png')}
            className="w-10 h-10 rounded-full"
            />
        </View>
    );
};

export default Header;