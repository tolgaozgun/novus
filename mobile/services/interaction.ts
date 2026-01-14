import api from './api';

export interface UserFavorite {
    id: number;
    userId: string;
    itemType: 'QUOTE' | 'BOOK' | 'MOVIE';
    itemId: number;
}

export const interactionService = {
    addFavorite: async (type: 'QUOTE' | 'BOOK' | 'MOVIE', id: number): Promise<UserFavorite> => {
        const response = await api.post<{ data: UserFavorite }>(`/favorites/${type}/${id}`);
        return response.data.data;
    },

    removeFavorite: async (type: 'QUOTE' | 'BOOK' | 'MOVIE', id: number): Promise<void> => {
        await api.delete(`/favorites/${type}/${id}`);
    },

    getFavorites: async (): Promise<UserFavorite[]> => {
        const response = await api.get<{ data: UserFavorite[] }>('/favorites');
        return response.data.data;
    },
};
