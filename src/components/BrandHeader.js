import { StyleSheet, Text, View } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide';
import { colors } from '../styles/colors';

export default function BrandHeader({
  appName = 'appstore',
  greeting = 'Olá, seja bem-vindo!',
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.brand}>
        <Lucide
          name="shopping-bag"
          size={32}
          color={colors.buttonText}
          accessible={false}
        />
        <Text style={styles.brandName}>{appName}</Text>
      </View>
      <Text style={styles.greeting}>{greeting}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 28,
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
  greeting: {
    color: colors.buttonText,
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});
