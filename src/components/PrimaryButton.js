import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/colors';

export default function PrimaryButton({
  label = 'Entrar',
  loading = false,
  loadingLabel = 'Realizando login',
  disabled = false,
  variant = 'primary',
  onPress,
  style,
}) {
  const isDisabled = disabled || loading;
  const isOutlined = variant === 'outlined';

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isOutlined ? styles.outlinedButton : null,
        pressed && !isDisabled
          ? isOutlined
            ? styles.outlinedButtonPressed
            : styles.buttonPressed
          : null,
        isDisabled ? styles.buttonDisabled : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isOutlined ? colors.primary : colors.buttonText}
          accessibilityLabel={loadingLabel}
        />
      ) : (
        <Text style={[styles.label, isOutlined ? styles.outlinedLabel : null]}>
          {label}
        </Text>
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
  outlinedButton: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  outlinedButtonPressed: {
    backgroundColor: colors.background,
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
  outlinedLabel: {
    color: colors.primary,
  },
});
