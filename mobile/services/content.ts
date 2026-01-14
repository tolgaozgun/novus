import api from './api';

export interface Book {
    id: number;
    title: string;
    author: string;
    description?: string;
    coverImageUrl?: string;
    amazonLink?: string;
}

export interface Movie {
    id: number;
    title: string;
    description?: string;
    posterImageUrl?: string;
    director?: string;
    releaseYear?: number;
}

export const contentService = {
    getBooks: async (author?: string): Promise<Book[]> => {
        const url = author ? `/content/books?author=${encodeURIComponent(author)}` : '/content/books';
        const response = await api.get<{ data: Book[] }>(url);
        return response.data.data;
    },

    getMovies: async (): Promise<Movie[]> => {
        const response = await api.get<{ data: Movie[] }>('/content/movies');
        return response.data.data;
    },
};
