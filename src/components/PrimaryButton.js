import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/colors';

export default function PrimaryButton({
  label = 'Entrar',
  loading = false,
  disabled = false,
  onPress,
  style,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled ? styles.buttonPressed : null,
        isDisabled ? styles.buttonDisabled : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={colors.buttonText}
          accessibilityLabel="Realizando login"
        />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginTop: 20,
  },
  buttonPressed: {
    backgroundColor: colors.buttonPressed,
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  label: {
    color: colors.buttonText,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
  },
});
