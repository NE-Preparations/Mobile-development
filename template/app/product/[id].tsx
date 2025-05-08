import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Product, ProductsData } from "@/components/types";

import productsData from "../../data.json";

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = (productsData as ProductsData).products.find(
      (p) => p.id === id
    );

    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "Product deleted successfully!", [
              { text: "OK", onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  if (loading || !product) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading product...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete} className="p-2">
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-white">
        <Image
          source={{ uri: `../../assets/images/${product.cover_image}` }}
          defaultSource={require("../../assets/images/placeholder.jpg")}
          className="w-full h-64"
          resizeMode="cover"
        />

        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-1">
            {product.name}
          </Text>
          <Text className="text-lg text-gray-700 mb-2">{product.type}</Text>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-primary">
              ${product.price.toFixed(2)}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={18} color="#F59E0B" />
              <Text className="ml-1 text-gray-700">
                {product.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm text-gray-500">Producer</Text>
            <Text className="text-base text-gray-800">{product.producer}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm text-gray-500">Contact</Text>
            <Text className="text-base text-gray-800">
              {product.publisher_email}
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm text-gray-500">Release Date</Text>
            <Text className="text-base text-gray-800">
              {product.release_date}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed">
              {product.details}
            </Text>
          </View>

          {/* Comments Section */}
          <View>
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Comments
            </Text>
            {product.comments.length > 0 ? (
              product.comments.map((comment, index) => (
                <View
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg mb-3 border border-gray-100"
                >
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="font-semibold text-gray-800">
                      {comment.user}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {comment.date}
                    </Text>
                  </View>
                  <Text className="text-gray-700">{comment.comment}</Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 italic">No comments yet</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
