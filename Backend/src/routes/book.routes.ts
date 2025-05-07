import express from 'express';
import { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook, 
  searchBooks, 
  filterBooksByCategory,
  borrowBook,
  returnBook,
  getBorrowedBooks
} from '../controllers/book.controller';
import { auth, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../models/user.model';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/category/:category', filterBooksByCategory);
router.get('/:id', getBookById);

router.get('/user/borrowed', auth, authorize([UserRole.STUDENT]), getBorrowedBooks);
router.put('/:id/borrow', auth, authorize([UserRole.STUDENT]), borrowBook);
router.put('/:id/return', auth, authorize([UserRole.STUDENT]), returnBook);

router.post('/', auth, authorize([UserRole.LIBRARIAN]), createBook);
router.put('/:id', auth, authorize([UserRole.LIBRARIAN]), updateBook);
router.delete('/:id', auth, authorize([UserRole.LIBRARIAN]), deleteBook);

export default router;