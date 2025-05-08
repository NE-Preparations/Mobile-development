import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from './types';

const addProduct = (product: Partial<Product>) => {

    return true;
};

const ProductForm = () => {
    const router = useRoouter();
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        details: '',
        producer: '',
        price: '',
        publisher_email: '',
        rating: '',
        release_date: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };


    const handleSubmit = () => {
        if (!formData.name || !formData.details || !formData.publisher_email) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
          }

        const newProduct = {
            ...formData,
            id: Date.now().toString,
            price: parseFloat(formData.price) || 0,
            rating: parseFloat(formData.rating) || 0,
            cover_image: 'placeholder.jpg',
            comments: [],
        } ;

        const success = addProduct(newProduct as Partial<Product>);

        if(success) {
            Alert.alert(
                'Success',
                'Product created successfully!',
                [{ text: 'OK', onPress: () => router.push('/home') }]
            );
        }
    };

    return (
        <ScrollView className="flex-1 p-4">
            <Text className="text-lg font-bold mb-6 text-center">Create New Product</Text>

            <View className="mb-4">
            <Text className="font-medium text-gray-700 mb-1">Name *</Text>
            <TextInput
            className="border border-gray-300 rounded-lg p-3 bg-white"
            placeholder="Product Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            />
            </View>

            <View className="mb-4">
        <Text className="font-medium text-gray-700 mb-1">Type</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white"
          placeholder="Electronics, Clothing, etc."
          value={formData.type}
          onChangeText={(text) => handleInputChange('type', text)}
        />
      </View>
      
      <View className="mb-4">
        <Text className="font-medium text-gray-700 mb-1">Details *</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white"
          placeholder="Product description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={formData.details}
          onChangeText={(text) => handleInputChange('details', text)}
        />
      </View>
      
      <View className="mb-4">
        <Text className="font-medium text-gray-700 mb-1">Producer</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white"
          placeholder="Company Name"
          value={formData.producer}
          onChangeText={(text) => handleInputChange('producer', text)}
        />
      </View>
      
      <View className="mb-4">
        <Text className="font-medium text-gray-700 mb-1">Price</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white"
          placeholder="0.00"
          keyboardType="decimal-pad"
          value={formData.price}
          onChangeText={(text) => handleInputChange('price', text)}
        />
      </View>
      
      <View className="mb-4">
        <Text className="font-medium text-gray-700 mb-1">Publisher Email *</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white"
          placeholder="email@example.com"
          keyboardType="email-address"
          value={formData.publisher_email}
          onChangeText={(text) => handleInputChange('publisher_email', text)}
        />
      </View>
      
      <View className="mb-4">
        <Text className="font-medium text-gray-700 mb-1">Rating (0-5)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white"
          placeholder="4.5"
          keyboardType="decimal-pad"
          value={formData.rating}
          onChangeText={(text) => handleInputChange('rating', text)}
        />
      </View>
      
      <View className="mb-6">
        <Text className="font-medium text-gray-700 mb-1">Release Date</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white"
          placeholder="YYYY-MM-DD"
          value={formData.release_date}
          onChangeText={(text) => handleInputChange('release_date', text)}
        />
      </View>

      <TouchableOpacity
        className="bg-primary py-3 rounded-lg mb-6"
        onPress={handleSubmit}
      >
        <Text className="text-white font-bold text-center">Create Product</Text>
      </TouchableOpacity>
        </ScrollView>
    );
};

export default ProductForm;