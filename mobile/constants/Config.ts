import { Platform } from 'react-native';

const API_URL = Platform.select({
  ios: 'http://localhost:8080/api/v1',
  android: 'http://10.0.2.2:8080/api/v1',
  default: 'http://localhost:8080/api/v1',
});

const AUTH_CONFIG = {
  issuer: 'http://localhost:8080/realms/novus', // Adjust based on Keycloak setup
  clientId: 'novus-mobile',
  redirectUrl: 'novus://auth',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
};

export const Config = {
  API_URL,
  AUTH_CONFIG,
};
