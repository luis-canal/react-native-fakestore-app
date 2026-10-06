import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@StoreApp:authToken';
const AUTH_SESSION_KEY = '@StoreApp:authSession';

export async function getAuthSession() {
  const storedSession = await AsyncStorage.getItem(AUTH_SESSION_KEY);
  if (storedSession) {
    return JSON.parse(storedSession);
  }

  const legacyToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return legacyToken
    ? { accessToken: legacyToken, refreshToken: null, user: null }
    : null;
}

export async function saveAuthSession(session) {
  await AsyncStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function clearAuthSession() {
  await AsyncStorage.multiRemove([AUTH_SESSION_KEY, AUTH_TOKEN_KEY]);
}
