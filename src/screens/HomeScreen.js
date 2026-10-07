import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../styles/colors';
import {
  getProductCategories,
  getProducts,
  getProductsByCategory,
} from '../services/api';

import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getProductCategories();
        setCategories(data);
      } catch {
        setError('Não foi possível carregar as categorias.');
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError('');

        let data;

        if (selectedCategory === '') {
          data = await getProducts();
        } else {
          data = await getProductsByCategory(selectedCategory);
        }

        setProducts(data);
      } catch {
        setError('Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [selectedCategory]);

  function renderProduct({ item }) {
    return (
      <ProductCard
        product={item}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            id: item.id,
          })
        }
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          color={colors.primary}
          size="large"
        />

        <Text style={styles.loadingText}>
          Carregando produtos...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  list: {
    padding: 16,
    paddingTop: 8,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  loadingText: {
    color: colors.textSecondary,
    fontFamily: 'Inter',
    fontSize: 16,
    marginTop: 12,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },

  errorText: {
    color: colors.error,
    fontFamily: 'Inter',
    fontSize: 16,
    textAlign: 'center',
  },
});