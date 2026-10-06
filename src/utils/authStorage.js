import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@StoreApp:authToken';
const AUTH_SESSION_KEY = '@StoreApp:authSession';

export async function getAuthSession() {
  const storedSession = await AsyncStorage.getItem(AUTH_SESSION_KEY);
  if (storedSession) {
    const { accessToken, user } = JSON.parse(storedSession);
    const session = { accessToken, user: user || null };
    await AsyncStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    return session;
  }

  const legacyToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return legacyToken
    ? { accessToken: legacyToken, user: null }
    : null;
}

export async function saveAuthSession({ accessToken, user }) {
  await AsyncStorage.setItem(
    AUTH_SESSION_KEY,
    JSON.stringify({ accessToken, user }),
  );
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function clearAuthSession() {
  await AsyncStorage.multiRemove([AUTH_SESSION_KEY, AUTH_TOKEN_KEY]);
}
