import { Request, Response } from "express";
import Book, { IBook } from "../models/book.model";
import User from "../models/user.model";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skipIndex = (page - 1) * limit;

    const books = await Book.find()
      .populate("borrowebBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex);

    const total = await Book.countDocuments();

    res.status(200).json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "borroweBy",
      "name email"
    );

    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(book);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      author,
      category,
      ISBN,
      publicationYear,
      description,
      coverImage,
    } = req.body;

    const book = new Book({
      title,
      author,
      category,
      ISBN,
      publicationYear,
      description,
      coverImage,
      available: true,
    });

    const savedBook = await book.save();

    res.status(201).json(savedBook);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("borrowedBy", "name email");

    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(updateBook);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json({ message: "Book deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      res.status(400).json({ message: "Search query is required" });
    } else {
      const searchRegex = new RegExp(query, "i");

      const books = await Book.find({
        $or: [
          { title: searchRegex },
          { author: searchRegex },
          { category: searchRegex },
          { ISBN: searchRegex },
        ],
      }).populate("borrowedBy", "name email");

      res.status(200).json(books);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const filterBooksByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;

    const books = await Book.find({
      category: new RegExp(category, "i"),
    }).populate("borrowedBy", "name email");

    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      if (!book.available) {
        res
          .status(400)
          .json({ message: "Book is not available for borrowing" });
      } else {
        book.available = false;
        book.borrowedBy = userId;
        book.borrowDate = new Date();
        book.returnDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

        await book.save();

        res.status(200).json({ message: "Book borrowed successfully", book });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      if (
        book.available ||
        !book.borrowedBy ||
        book.borrowedBy.toString() !== userId
      ) {
        res.status(400).json({ message: "You have not borrowed this book" });
      } else {
        book.available = true;
        book.borrowedBy = undefined;
        book.borrowDate = undefined;
        book.returnDate = undefined;

        await book.save();

        res.status(200).json({ message: "Book returned successfully", book });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const books = await Book.find({ borrowedBy: userId }).populate(
      "borrowedBy",
      "name email"
    );

    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
