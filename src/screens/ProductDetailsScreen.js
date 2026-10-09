import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { isAxiosError, isCancel } from 'axios';

import { colors } from '../styles/colors';
import { getProductById, ProductNotFoundError } from '../services/api';

import ProductDetails from '../components/ProductDetails';
import PrimaryButton from '../components/PrimaryButton';

const NOT_FOUND_ERROR = 'Produto não encontrado.';
const CONNECTION_ERROR =
  'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
const API_ERROR = 'Não foi possível carregar o produto. Tente novamente.';

function getErrorMessage(error) {
  if (
    error instanceof ProductNotFoundError ||
    (isAxiosError(error) && error.response?.status === 404)
  ) {
    return NOT_FOUND_ERROR;
  }

  if (isAxiosError(error) && !error.response) {
    return CONNECTION_ERROR;
  }

  return API_ERROR;
}

export default function ProductDetailsScreen({ route }) {
  const id = route.params?.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        setLoading(true);
        setError('');
        setProduct(null);

        const data = await getProductById(id, {
          signal: controller.signal,
        });

        setProduct(data);
      } catch (requestError) {
        if (isCancel(requestError)) {
          return;
        }

        setError(getErrorMessage(requestError));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [id, attempt]);

  const handleRetry = useCallback(() => {
    setAttempt((current) => current + 1);
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator
          color={colors.primary}
          size="large"
          accessibilityLabel="Carregando produto"
        />

        <Text style={styles.loadingText}>
          Carregando produto...
        </Text>
      </View>
    );
  }

  if (error || !product) {
    const message = error || NOT_FOUND_ERROR;

    return (
      <View style={styles.centerContainer}>
        <Text accessibilityRole="alert" style={styles.errorText}>
          {message}
        </Text>

        {message !== NOT_FOUND_ERROR ? (
          <PrimaryButton
            label="Tentar novamente"
            onPress={handleRetry}
            style={styles.retryButton}
          />
        ) : null}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <ProductDetails product={product} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 16,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },

  loadingText: {
    color: colors.textSecondary,
    fontFamily: 'Inter',
    fontSize: 16,
    marginTop: 12,
  },

  errorText: {
    color: colors.error,
    fontFamily: 'Inter',
    fontSize: 16,
    textAlign: 'center',
  },

  retryButton: {
    alignSelf: 'stretch',
    paddingHorizontal: 24,
  },
});
