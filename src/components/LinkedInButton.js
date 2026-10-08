import { Alert, Linking, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/colors';

export default function LinkedInButton({ name, url }) {
  async function openProfile() {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Não foi possível abrir o LinkedIn',
        `Tente novamente mais tarde para acessar o perfil de ${name}.`,
      );
    }
  }

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`Abrir LinkedIn de ${name}`}
      onPress={openProfile}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.label}>LinkedIn</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    minHeight: 36,
    justifyContent: 'center',
    marginTop: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  buttonPressed: {
    backgroundColor: colors.buttonPressed,
  },
  label: {
    color: colors.buttonText,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
});
