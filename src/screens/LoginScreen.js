import { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { isAxiosError } from 'axios';
import { useAuthContext } from '../context/authContext';
import BrandHeader from '../components/BrandHeader';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles/colors';

const CONNECTION_ERROR =
  'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
const INVALID_CREDENTIALS = 'Username ou senha inválidos.';
const API_ERROR = 'Não foi possível realizar o login. Tente novamente.';

export default function LoginScreen() {
  const { height: screenHeight } = useWindowDimensions();
  const { entrar } = useAuthContext();
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

    try {
      await entrar({
        username: normalizedUsername,
        password,
      });
    } catch (requestError) {
      if (isAxiosError(requestError) && !requestError.response) {
        setError(CONNECTION_ERROR);
      } else if (
        isAxiosError(requestError) &&
        [400, 401, 403].includes(requestError.response?.status)
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
        <BrandHeader
          appName="appstore"
          greeting="Olá, seja bem-vindo!"
          style={[
            styles.header,
            {
              height: screenHeight / 2,
              paddingBottom: screenHeight * 0.1,
            },
          ]}
        />

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
              <InputField
                accessibilityHint={fieldErrors.username || undefined}
                accessibilityState={{ disabled: loading }}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                autoFocus
                editable={!loading}
                error={fieldErrors.username}
                keyboardType="default"
                label="Username"
                onChangeText={handleUsernameChange}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                placeholder="Digite seu username"
                placeholderTextColor={colors.textSecondary}
                returnKeyType="next"
                selectionColor={colors.primary}
                textContentType="none"
                value={username}
              />

              <PasswordField
                inputRef={passwordInputRef}
                accessibilityHint={fieldErrors.password || undefined}
                accessibilityState={{ disabled: loading }}
                editable={!loading}
                error={fieldErrors.password}
                label="Senha"
                onChangeText={handlePasswordChange}
                onSubmitEditing={handleLogin}
                onToggleVisibility={() =>
                  setPasswordVisible((visible) => !visible)
                }
                passwordVisible={passwordVisible}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.textSecondary}
                returnKeyType="done"
                selectionColor={colors.primary}
                textContentType="none"
                value={password}
              />
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

            <PrimaryButton
              label="Entrar"
              loading={loading}
              onPress={handleLogin}
            />
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
  form: {
    gap: 16,
  },
  error: {
    color: colors.error,
    fontFamily: 'Inter',
    fontSize: 14,
    marginTop: 12,
  },
});
