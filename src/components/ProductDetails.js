import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

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
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
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
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
  },
  image: {
    width: 160,
    height: 160,
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
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: colors.textSecondary,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 21,
  },
});
