import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export default function DeveloperCard({ name, registration }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.registration}>RA: {registration}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
  },
  name: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
  },
  registration: {
    marginTop: 6,
    color: colors.textSecondary,
    fontFamily: 'Inter',
    fontSize: 14,
  },
});
