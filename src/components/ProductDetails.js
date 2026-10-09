import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export default function ProductDetails({ product }) {
  return (
    <View style={styles.container}>
      <Image
        accessibilityLabel={product.title}
        resizeMode="contain"
        source={{ uri: product.image }}
        style={styles.image}
      />
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>

      <Text style={styles.sectionTitle}>Descrição</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
  },
  image: {
    width: '100%',
    height: 240,
    alignSelf: 'center',
    marginBottom: 8,
  },
  category: {
    color: colors.textSecondary,
    fontFamily: 'Inter',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  title: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
  },
  price: {
    color: colors.primary,
    fontFamily: 'Inter',
    fontSize: 22,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  description: {
    color: colors.textSecondary,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 21,
  },
});
