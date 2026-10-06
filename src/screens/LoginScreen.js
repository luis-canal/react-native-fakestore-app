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
  useWindowDimensions,
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
  const { height: screenHeight } = useWindowDimensions();
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
        <View
          style={[
            styles.header,
            {
              height: screenHeight / 2,
              paddingBottom: screenHeight * 0.1,
            },
          ]}
        >
          <View style={styles.brand}>
            <Lucide
              name="shopping-bag"
              size={32}
              color={colors.buttonText}
              accessible={false}
            />
            <Text style={styles.brandName}>appstore</Text>
          </View>
          <Text style={styles.title}>Olá, seja bem-vindo!</Text>
        </View>

        <View
          style={[
            styles.panel,
            {
              minHeight: screenHeight / 2,
              paddingTop: screenHeight * 0.05,
            },
          ]}
        >
          <View style={styles.content}>
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
                <Text style={styles.label}>Senha</Text>
                <View
                  style={[
                    styles.passwordInputContainer,
                    fieldErrors.password ? styles.inputError : null,
                  ]}
                >
                  <TextInput
                    ref={passwordInputRef}
                    accessibilityLabel="Senha"
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    paddingTop: 0,
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  panel: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.inputBackground,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  content: {
    width: '100%',
    maxWidth: 440,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 22,
  },
  brandName: {
    color: colors.buttonText,
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    color: colors.buttonText,
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
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
