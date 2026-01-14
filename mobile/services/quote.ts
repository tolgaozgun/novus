import api from './api';

export interface Quote {
    id: number;
    content: string;
    author?: string;
    category?: string;
    backgroundImageUrl?: string;
    isPremium: boolean;
    isReligious: boolean;
}

export const quoteService = {
    getRandomQuotes: async (limit: number = 10): Promise<Quote[]> => {
        const response = await api.get<{ data: Quote[] }>(`/quotes/random?limit=${limit}`);
        return response.data.data;
    },

    getQuotesByAuthor: async (author: string): Promise<Quote[]> => {
        const response = await api.get<{ data: Quote[] }>(`/quotes?author=${encodeURIComponent(author)}`);
        return response.data.data;
    },

    getQuoteById: async (id: number): Promise<Quote> => {
        const response = await api.get<{ data: Quote }>(`/quotes/${id}`);
        return response.data.data;
    },
};
