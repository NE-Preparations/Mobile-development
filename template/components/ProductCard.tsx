import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();

    const handleReadMore = () => {
        router.push(`/product/${product.id}`);
    };

    const shortDescription = product.details.length > 80 ? `${product.details.substring(0, 80)}...` : product.details;

    return (
        <View className="bg-white rounded-lg shadow-md p-4 mb-4">
            <View className="flex-row items-start">
                <Image
                  source={{ uri: `../assets/images/$product.cover_image` }}
                  defaultSource={require('../assets/images/placeholder.jpg')}
                  className="w-12 h-12 rounded-full"
                />
                <View className="ml-3 flex-1">
                    <Text className="font-bold text-lg text-gray-800">{product.name}</Text>
                    <Text className="font-bold text-gray-500 mb-2">{product.publisher_email}</Text>
                    <Text className="font-bold text-gray-600 mb-2">{shortDescription}</Text>
                    <TouchableOpacity
                        onPress={handleReadMore}
                        className="bg-primary py-2 px-4 rounded-lg self-end"
                    >
                        <Text className="text-white font-medium">Read More</Text>
                    </TouchableOpacity>
                </View>

        </View>
    );
};

export default ProductCard;