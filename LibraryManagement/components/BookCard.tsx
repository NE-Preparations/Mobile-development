import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Book } from '../types';
import { getAvailabilityStatus, truncateText } from '../utils';

interface BookCardProps {
  book: Book;
  compact?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, compact = false }) => {
  const { status, color } = getAvailabilityStatus(book);
  const placeholderImage = 'https://via.placeholder.com/150x225';

  if (compact) {
    return (
      <Link href={`/books/${book.id}`} asChild>
        <TouchableOpacity className="flex-row bg-white rounded-lg overflow-hidden shadow-md p-2 mb-3">
          <Image
            source={{ uri: book.coverImage || placeholderImage }}
            className="w-16 h-24 rounded-md"
          />
          <View className="flex-1 ml-3 justify-center">
            <Text className="text-base font-semibold">{truncateText(book.title, 25)}</Text>
            <Text className="text-sm text-gray-600">by {book.author}</Text>
            <Text className={`text-sm ${color}`}>{status}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <Link href={`/books/${book.id}`} asChild>
      <TouchableOpacity className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
        <Image
          source={{ uri: book.coverImage || placeholderImage }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold flex-1">{truncateText(book.title, 20)}</Text>
            <Text className={`text-sm px-2 py-1 rounded-full ${color === 'text-green-600' ? 'bg-green-100' : 'bg-red-100'} ${color}`}>
              {status}
            </Text>
          </View>
          <Text className="text-gray-700 mb-1">by {book.author}</Text>
          <Text className="text-gray-600 mb-2">{book.category} • {book.publicationYear}</Text>
          <Text className="text-gray-500 text-sm">{truncateText(book.description, 80)}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}