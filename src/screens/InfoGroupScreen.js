import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DeveloperCard from '../components/DeveloperCard';
import { colors } from '../styles/colors';

const developers = [
  { id: '1138269', name: 'Eduardo Pagliarini Herter', registration: '1138269' },
  { id: '1138143', name: 'Guilherme Vassoler Daros', registration: '1138143' },
  { id: '1138218', name: 'Kaiki André Pauletto', registration: '1138218' },
  { id: '1137999', name: 'Luis Eduardo Brescansin Canal', registration: '1137999' },
];

export default function InfoGroupScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.introduction}>
        <Text style={styles.title}>Desenvolvedores</Text>
        <Text style={styles.description}>
          Integrantes do grupo responsável pelo projeto.
        </Text>
      </View>

      <View style={styles.list}>
        {developers.map((developer) => (
          <DeveloperCard
            key={developer.id}
            name={developer.name}
            registration={developer.registration}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  introduction: {
    marginBottom: 20,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    marginTop: 8,
    color: colors.textSecondary,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    gap: 12,
  },
});
