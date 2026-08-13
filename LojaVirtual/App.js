import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import PerfilScreen from "./src/screens/PerfilScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Loja Virtual" }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Detalhes" }} />
        <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: "Meus dados" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}