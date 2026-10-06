import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo ao StoreApp!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  welcome: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
