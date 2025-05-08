import { Product, ProductsData } from './../components/types';
import productsData from './../data.json';


export const getAllProducts = (): Product[] => {
    return (productsData as ProductsData).products;
  };

  export const getProductById = (id: string): Product | undefined => {
    return (productsData as ProductsData).products.find(product => product.id === id);
  };
  
  export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };
  

  export const getShortDescription = (text: string, maxLength: number = 80): string => {
    return text.length > maxLength 
      ? `${text.substring(0, maxLength)}...` 
      : text;
  };
  
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };