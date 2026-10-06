import { Pressable, StyleSheet } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide';
import InputField from './InputField';
import { colors } from '../styles/colors';

export default function PasswordField({
  label = 'Senha',
  error,
  inputRef,
  passwordVisible,
  onToggleVisibility,
  style,
  inputStyle,
  ...inputProps
}) {
  return (
    <InputField
      {...inputProps}
      inputRef={inputRef}
      accessibilityLabel={inputProps.accessibilityLabel || label}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      error={error}
      inputStyle={[styles.passwordInput, inputStyle]}
      label={label}
      rightAccessory={
        <Pressable
          accessibilityLabel={
            passwordVisible ? 'Ocultar senha' : 'Mostrar senha'
          }
          accessibilityRole="button"
          accessibilityHint={
            passwordVisible
              ? 'Oculta a senha digitada'
              : 'Mostra a senha digitada'
          }
          accessibilityState={{ disabled: Boolean(inputProps.editable === false) }}
          disabled={inputProps.editable === false}
          hitSlop={8}
          onPress={onToggleVisibility}
          style={styles.visibilityButton}
        >
          <Lucide
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={22}
            color={colors.textSecondary}
            accessible={false}
          />
        </Pressable>
      }
      secureTextEntry={!passwordVisible}
      style={style}
    />
  );
}

const styles = StyleSheet.create({
  passwordInput: {
    paddingRight: 4,
  },
  visibilityButton: {
    width: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
