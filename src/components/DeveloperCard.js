import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export default function DeveloperCard({ name, registration, photo }) {
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.registration}>RA: {registration}</Text>
      </View>
      <Image
        source={photo}
        style={styles.photo}
        accessibilityLabel={`Foto de ${name}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
  },
  details: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  registration: {
    marginTop: 6,
    color: colors.textSecondary,
    fontFamily: 'Inter',
    fontSize: 14,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});
