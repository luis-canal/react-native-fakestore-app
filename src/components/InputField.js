import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../styles/colors';

export default function InputField({
  label,
  error,
  style,
  inputStyle,
  inputRef,
  rightAccessory,
  ...inputProps
}) {
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <TextInput
          ref={inputRef}
          {...inputProps}
          accessibilityLabel={inputProps.accessibilityLabel || label}
          style={[styles.input, inputStyle]}
        />
        {rightAccessory}
      </View>
      {error ? (
        <Text
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
          style={styles.fieldError}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
  },
  input: {
    flex: 1,
    minHeight: 50,
    paddingHorizontal: 14,
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
  },
  fieldError: {
    color: colors.error,
    fontFamily: 'Inter',
    fontSize: 14,
  },
});
