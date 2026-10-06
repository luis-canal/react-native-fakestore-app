import { useRef, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { isAxiosError } from 'axios';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import ProductDetails from '../components/ProductDetails';
import { getProductById } from '../services/api';
import { colors } from '../styles/colors';

export default function HomeScreen() {
  const isSearchingRef = useRef(false);
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    if (isSearchingRef.current) {
      return;
    }

    const normalizedId = productId.trim();
    if (!/^\d+$/.test(normalizedId) || Number(normalizedId) < 1) {
      setError('Digite um ID de produto válido.');
      setProduct(null);
      return;
    }

    isSearchingRef.current = true;
    setLoading(true);
    setError('');
    setProduct(null);
    Keyboard.dismiss();

    try {
      const result = await getProductById(normalizedId);
      if (result?.id == null) {
        setError('Produto não encontrado.');
      } else {
        setProduct(result);
      }
    } catch (requestError) {
      if (isAxiosError(requestError) && !requestError.response) {
        setError(
          'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
        );
      } else if (
        isAxiosError(requestError) &&
        requestError.response?.status === 404
      ) {
        setError('Produto não encontrado.');
      } else {
        setError('Não foi possível buscar o produto. Tente novamente.');
      }
    } finally {
      isSearchingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Buscar produto</Text>
        <InputField
          accessibilityState={{ disabled: loading }}
          editable={!loading}
          keyboardType="number-pad"
          label="ID do produto"
          onChangeText={(value) => {
            setProductId(value);
            setError('');
          }}
          onSubmitEditing={handleSearch}
          placeholder="Digite o ID do produto"
          placeholderTextColor={colors.textSecondary}
          returnKeyType="search"
          selectionColor={colors.primary}
          value={productId}
        />
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
          label="Buscar produto"
          loading={loading}
          loadingLabel="Buscando produto"
          onPress={handleSearch}
        />
        {product ? <ProductDetails product={product} /> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    gap: 16,
    padding: 24,
    backgroundColor: colors.background,
  },
  heading: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
  },
  error: {
    color: colors.error,
    fontFamily: 'Inter',
    fontSize: 14,
  },
});
