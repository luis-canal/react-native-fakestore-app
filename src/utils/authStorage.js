import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@StoreApp:authToken';

export async function getAuthToken() {
  return AsyncStorage.getItem(AUTH_TOKEN_KEY);
}

export async function saveAuthToken(token) {
  return AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
}
