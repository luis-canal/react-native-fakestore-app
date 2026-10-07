import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { useAuthContext } from '../context/authContext';

export default function HomeHeader({ navigation }) {
  const { sair } = useAuthContext();
  const insets = useSafeAreaInsets();

  async function handleLogout() {
    await sair();
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Pressable
          onPress={handleLogout}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>

        <Text style={styles.title}>
          Produtos
        </Text>

        <Pressable
          onPress={() => navigation.navigate('Informacoes')}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel="Abrir informações do grupo"
        >
          <Text style={styles.infoText}>ⓘ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },

  content: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  button: {
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors.primary,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },

  infoText: {
    color: colors.primary,
    fontSize: 24,
  },

  title: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});