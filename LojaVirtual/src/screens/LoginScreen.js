import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../services/supabase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  async function entrar() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email.trim().toLowerCase())
      .eq("senha", senha);

    if (error) {
      Alert.alert("Erro", "Não foi possível consultar o banco.");
      return;
    }

    if (data.length > 0) {
      navigation.navigate("Home", {
        usuario: data[0],
      });
    } else {
      Alert.alert("Atenção", "E-mail ou senha incorretos.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Biblioteca web</Text>
      <Text style={styles.subtitle}>Encontre livros por aqui</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={entrar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.link}>Não tenho cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: { fontSize: 34, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 17, marginBottom: 30 },
  input: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 17 },
  link: { color: "#007BFF", marginTop: 18 },
});