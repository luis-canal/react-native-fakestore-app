import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexto/authContext';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
