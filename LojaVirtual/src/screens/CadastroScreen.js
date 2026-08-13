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

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function cadastrar() {
    if (nome === "" || email === "" || senha === "") {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const { error } = await supabase
      .from("usuarios")
      .insert([
        {
          nome: nome,
          email: email.toLowerCase(),
          senha: senha,
        },
      ]);

    if (error) {
      Alert.alert("Erro", "Não foi possível cadastrar. Verifique se o e-mail já existe.");
    } else {
      Alert.alert("Sucesso", "Usuário cadastrado!");
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma senha fictícia"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#198754",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});