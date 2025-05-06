import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getBooks } from "../api/books";
import { Book } from "../types/book";
import { getUser } from "../utils/auth";

export default function BookListScreen() {
  const navigation = useNavigation();
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<{ role: "STUDENT" | "LIBRARIAN" } | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      setUser(userData);
      const bookData = await getBooks();
      setBooks(bookData);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {user?.role === "LIBRARIAN" && (
        <Button
          title="Add Book"
          onPress={() => navigation.navigate("BookForm")}
        />
      )}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text>{item.author}</Text>
            <Button
              title="Details"
              onPress={() => navigation.navigate("BookDetails", {
                  bookId: item.id,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    bookItem: { padding: 10, borderBottomWidth: 1, marginBottom: 10 },
    bookTitle: { fontSize: 18, fontWeight: 'bold' },
});