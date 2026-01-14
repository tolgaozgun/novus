import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { Config } from '../constants/Config';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

class AuthService {
    private token: string | null = null;

    async init() {
        this.token = await AsyncStorage.getItem(TOKEN_KEY);
    }

    async getToken(): Promise<string | null> {
        if (!this.token) {
            this.token = await AsyncStorage.getItem(TOKEN_KEY);
        }
        return this.token;
    }

    async setToken(token: string, refreshToken?: string) {
        this.token = token;
        await AsyncStorage.setItem(TOKEN_KEY, token);
        if (refreshToken) {
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
    }

    async logout() {
        this.token = null;
        await AsyncStorage.removeItem(TOKEN_KEY);
        await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);

        // Optional: Call Keycloak logout endpoint
    }
}

export const authService = new AuthService();
