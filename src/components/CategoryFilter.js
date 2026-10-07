import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../styles/colors';

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Pressable
          onPress={() => onSelectCategory('')}
          style={[
            styles.button,
            selectedCategory === '' && styles.selectedButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCategory === '' && styles.selectedButtonText,
            ]}
          >
            Todas
          </Text>
        </Pressable>

        {categories.map((category) => (
          <Pressable
            key={category.slug}
            onPress={() => onSelectCategory(category.slug)}
            style={[
              styles.button,
              selectedCategory === category.slug &&
                styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === category.slug &&
                  styles.selectedButtonText,
              ]}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 8,
  },

  content: {
    paddingHorizontal: 16,
  },

  button: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: colors.inputBackground,
  },

  selectedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  buttonText: {
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
  },

  selectedButtonText: {
    color: '#FFFFFF',
  },
});