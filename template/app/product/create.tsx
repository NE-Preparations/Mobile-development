import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProductForm from '../../components/ProductForm';

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      {/* Header with back button */}
      <View className="flex-row items-center p-4 bg-white border-b border-gray-200">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 mr-4"
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <View className="w-24 h-1 bg-gray-300 rounded-full" />
        </View>
        <View className="w-10" /> {/* Empty view for spacing */}
      </View>
      
      {/* Product Form */}
      <ProductForm />
    </SafeAreaView>
  );
}