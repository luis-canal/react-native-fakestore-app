import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../styles/colors';

export default function ProductCard({ product, onPress }) {
  function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.price}>
          {formatPrice(product.price)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  image: {
    width: 90,
    height: 90,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },

  name: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    color: colors.primary,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
});