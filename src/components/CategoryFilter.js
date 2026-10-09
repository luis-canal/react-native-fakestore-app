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
            key={category}
            onPress={() => onSelectCategory(category)}
            style={[
              styles.button,
              selectedCategory === category &&
                styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === category &&
                  styles.selectedButtonText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
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
    textTransform: 'capitalize',
  },

  selectedButtonText: {
    color: '#FFFFFF',
  },
});