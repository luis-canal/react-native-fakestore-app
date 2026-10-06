import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Lucide } from '@react-native-vector-icons/lucide';
import { isAxiosError } from 'axios';
import { getUsers, login } from '../services/api';
import { saveAuthToken } from '../utils/authStorage';
import { colors } from '../styles/colors';

const CONNECTION_ERROR =
  'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
const INVALID_CREDENTIALS = 'Username ou senha inválidos.';
const API_ERROR = 'Não foi possível realizar o login. Tente novamente.';

export default function LoginScreen() {
  const navigation = useNavigation();
  const passwordInputRef = useRef(null);
  const isSubmittingRef = useRef(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleUsernameChange(value) {
    setUsername(value);
    setError('');
    if (value.trim()) {
      setFieldErrors((current) => ({ ...current, username: '' }));
    }
  }

  function handlePasswordChange(value) {
    setPassword(value);
    setError('');
    if (value) {
      setFieldErrors((current) => ({ ...current, password: '' }));
    }
  }

  async function handleLogin() {
    if (isSubmittingRef.current) {
      return;
    }

    const normalizedUsername = username.trim();
    const nextFieldErrors = {
      username: normalizedUsername ? '' : 'Username é obrigatório.',
      password: password ? '' : 'Senha é obrigatória.',
    };

    setFieldErrors(nextFieldErrors);
    setError('');

    if (nextFieldErrors.username || nextFieldErrors.password) {
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);
    Keyboard.dismiss();

    let isLoginRequest = false;

    try {
      const users = await getUsers();
      const userExists = users.some(
        (user) => user.username === normalizedUsername,
      );

      if (!userExists) {
        setFieldErrors({ username: 'Usuário não encontrado.', password: '' });
        return;
      }

      isLoginRequest = true;
      const result = await login({
        username: normalizedUsername,
        password,
      });
      await saveAuthToken(result.token);
      navigation.replace('Home');
    } catch (requestError) {
      if (isAxiosError(requestError) && !requestError.response) {
        setError(CONNECTION_ERROR);
      } else if (
        isLoginRequest &&
        isAxiosError(requestError) &&
        [401, 403].includes(requestError.response?.status)
      ) {
        setError(INVALID_CREDENTIALS);
      } else {
        setError(API_ERROR);
      }
    } finally {
      isSubmittingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.brand}>
            <Lucide
              name="shopping-bag"
              size={32}
              color={colors.primary}
              accessible={false}
            />
            <Text style={styles.brandName}>StoreApp</Text>
          </View>

          <Text style={styles.title}>Login</Text>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                accessibilityLabel="Username"
                accessibilityHint={fieldErrors.username || undefined}
                accessibilityState={{ disabled: loading }}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                autoFocus
                editable={!loading}
                keyboardType="default"
                onChangeText={handleUsernameChange}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                placeholder="Digite seu username"
                placeholderTextColor={colors.textSecondary}
                returnKeyType="next"
                selectionColor={colors.primary}
                style={[
                  styles.input,
                  fieldErrors.username ? styles.inputError : null,
                ]}
                textContentType="none"
                value={username}
              />
              {fieldErrors.username ? (
                <Text
                  accessibilityLiveRegion="polite"
                  accessibilityRole="alert"
                  style={styles.fieldError}
                >
                  {fieldErrors.username}
                </Text>
              ) : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.passwordInputContainer,
                  fieldErrors.password ? styles.inputError : null,
                ]}
              >
                <TextInput
                  ref={passwordInputRef}
                  accessibilityLabel="Password"
                  accessibilityHint={fieldErrors.password || undefined}
                  accessibilityState={{ disabled: loading }}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  editable={!loading}
                  onChangeText={handlePasswordChange}
                  onSubmitEditing={handleLogin}
                  placeholder="Digite sua senha"
                  placeholderTextColor={colors.textSecondary}
                  returnKeyType="done"
                  secureTextEntry={!passwordVisible}
                  selectionColor={colors.primary}
                  style={styles.passwordInput}
                  textContentType="none"
                  value={password}
                />
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
                  accessibilityState={{ disabled: loading }}
                  disabled={loading}
                  hitSlop={8}
                  onPress={() => setPasswordVisible((visible) => !visible)}
                  style={styles.visibilityButton}
                >
                  <Lucide
                    name={passwordVisible ? 'eye-off' : 'eye'}
                    size={22}
                    color={colors.textSecondary}
                    accessible={false}
                  />
                </Pressable>
              </View>
              {fieldErrors.password ? (
                <Text
                  accessibilityLiveRegion="polite"
                  accessibilityRole="alert"
                  style={styles.fieldError}
                >
                  {fieldErrors.password}
                </Text>
              ) : null}
            </View>
          </View>

          {error ? (
            <Text
              accessibilityLiveRegion="assertive"
              accessibilityRole="alert"
              style={styles.error}
            >
              {error}
            </Text>
          ) : null}

          <Pressable
            accessibilityLabel="Entrar"
            accessibilityRole="button"
            accessibilityState={{ disabled: loading, busy: loading }}
            disabled={loading}
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && !loading ? styles.submitButtonPressed : null,
              loading ? styles.submitButtonDisabled : null,
            ]}
          >
            {loading ? (
              <ActivityIndicator
                color={colors.buttonText}
                accessibilityLabel="Realizando login"
              />
            ) : (
              <Text style={styles.submitButtonText}>Entrar</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 28,
  },
  brandName: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 14,
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
  },
  passwordInputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
  },
  passwordInput: {
    flex: 1,
    minHeight: 50,
    paddingLeft: 14,
    paddingRight: 4,
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
  },
  visibilityButton: {
    width: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldError: {
    color: colors.error,
    fontFamily: 'Inter',
    fontSize: 14,
  },
  error: {
    color: colors.error,
    fontFamily: 'Inter',
    fontSize: 14,
    marginTop: 12,
  },
  submitButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginTop: 20,
  },
  submitButtonPressed: {
    backgroundColor: colors.buttonPressed,
  },
  submitButtonDisabled: {
    opacity: 0.8,
  },
  submitButtonText: {
    color: colors.buttonText,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
  },
});
