export interface Comment {
    user: string;
    comment: string;
    date: string;
}

export interface Product {
    id: string;
    name: string;
    type: string;
    cover_image: string;
    details: string;
    producer: string;
    price: number;
    publisher_email: string;
    rating: number;
    comments: Comment[];
    release_date: string;
  }

export interface ProductsData {
    products: Product[];
}