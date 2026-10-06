import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { getAuthToken } from '../utils/authStorage';
import { colors } from '../styles/colors';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require('../../assets/fonts/InterVariable.ttf'),
  });
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function checkStoredToken() {
      try {
        const token = await getAuthToken();
        if (isMounted) {
          setInitialRoute(token ? 'Home' : 'Login');
        }
      } catch {
        if (isMounted) {
          setInitialRoute('Login');
        }
      }
    }

    checkStoredToken();

    return () => {
      isMounted = false;
    };
  }, []);

  if ((!fontsLoaded && !fontError) || initialRoute === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          color={colors.primary}
          size="large"
          accessibilityLabel="Carregando StoreApp"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          contentStyle: styles.screen,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  screen: {
    backgroundColor: colors.background,
  },
});
