import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import Button from './Button';
import { Book, BookFormData } from '../types';
import { bookCategories } from '../utils';
import { Picker } from '@react-native-picker/picker';

// Define the validation schema
const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  ISBN: z.string().min(1, 'ISBN is required'),
  publicationYear: z
    .string()
    .min(1, 'Publication year is required')
    .refine((val) => !isNaN(Number(val)), 'Must be a valid year')
    .transform((val) => Number(val)),
  description: z.string().min(1, 'Description is required'),
  coverImage: z.string().optional(),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => Promise<void>;
  isLoading: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, isLoading }) => {
  const [coverImage, setCoverImage] = useState<string | undefined>(book?.coverImage);
  
  const { control, handleSubmit, formState: { errors } } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title || '',
      author: book?.author || '',
      category: book?.category || bookCategories[0],
      ISBN: book?.ISBN || '',
      publicationYear: book?.publicationYear ? String(book.publicationYear) : '',
      description: book?.description || '',
      coverImage: book?.coverImage || '',
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
      // In a real app, you would upload this image to a server and get back a URL
      // For now, we'll just store the local URI
    }
  };

  const handleFormSubmit = (data: BookFormValues) => {
    const formData: BookFormData = {
      ...data,
      coverImage: coverImage || data.coverImage,
    };
    
    onSubmit(formData).catch((error) => {
      Alert.alert('Error', error.message || 'Failed to save book');
    });
  };

  return (
    <ScrollView className="flex-1 px-4">
      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Title</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="Book title"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.title && (
          <Text className="text-red-500 mt-1">{errors.title.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Author</Text>
        <Controller
          control={control}
          name="author"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="Author name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.author && (
          <Text className="text-red-500 mt-1">{errors.author.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Category</Text>
        <View className="border border-gray-300 rounded-lg bg-white">
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
              >
                {bookCategories.map((category) => (
                  <Picker.Item key={category} label={category} value={category} />
                ))}
              </Picker>
            )}
          />
        </View>
        {errors.category && (
          <Text className="text-red-500 mt-1">{errors.category.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">ISBN</Text>
        <Controller
          control={control}
          name="ISBN"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="ISBN"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.ISBN && (
          <Text className="text-red-500 mt-1">{errors.ISBN.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Publication Year</Text>
        <Controller
          control={control}
          name="publicationYear"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="Publication Year"
              value={String(value)}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />
        {errors.publicationYear && (
          <Text className="text-red-500 mt-1">{errors.publicationYear.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Description</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="Book description"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          )}
        />
        {errors.description && (
          <Text className="text-red-500 mt-1">{errors.description.message}</Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Cover Image</Text>
        <Button
          title="Pick an image"
          variant="outline"
          onPress={pickImage}
        />
        {coverImage && (
          <Text className="text-green-600 mt-2">Image selected</Text>
        )}
      </View>

      <Button
        title={book ? "Update Book" : "Add Book"}
        onPress={handleSubmit(handleFormSubmit)}
        loading={isLoading}
        fullWidth
        className="mb-6"
      />
    </ScrollView>
  );
};

export default BookForm;