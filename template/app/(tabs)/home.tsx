import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { Product, ProductsData } from "@/components/types";

import productsData from "../../data.json";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts((productsData as ProductsData).products);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1">
        <Header />
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-500">No products found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
