import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import InfoGroupScreen from '../screens/InfoGroupScreen';
import { useAuthContext } from '../context/authContext';
import { colors } from '../styles/colors';
import HomeHeader from '../components/HomeHeader';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { authenticated, initializationError, loading } = useAuthContext();
  const [fontsLoaded, fontError] = useFonts({
    Inter: require('../../assets/fonts/InterVariable.ttf'),
  });

  if ((!fontsLoaded && !fontError) || loading) {
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

  if (initializationError) {
    return (
      <View style={styles.loadingContainer}>
        <Text accessibilityRole="alert" style={styles.error}>
          {initializationError}
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: styles.screen,
        }}
      >
        {authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <HomeHeader navigation={navigation} />
                ),
              }}
            />
            <Stack.Screen
              name="Informacoes"
              component={InfoGroupScreen}
              options={{
                headerShown: true,
                title: 'Informações do grupo',
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  color: colors.textPrimary,
                  fontFamily: 'Inter',
                  fontWeight: '700',
                },
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
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
  error: {
    color: colors.error,
    fontFamily: 'Inter',
    fontSize: 14,
    textAlign: 'center',
  },
});
