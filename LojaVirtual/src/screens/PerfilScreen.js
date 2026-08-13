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

export default function PerfilScreen({ navigation, route }) {
  const { usuario } = route.params;

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [senha, setSenha] = useState(usuario.senha);

  async function salvar() {
    const { error } = await supabase
      .from("usuarios")
      .update({
        nome: nome,
        email: email.toLowerCase(),
        senha: senha,
      })
      .eq("id", usuario.id);

    if (error) {
      Alert.alert("Erro", "Não foi possível atualizar os dados.");
    } else {
      Alert.alert("Sucesso", "Dados atualizados!");

      const usuarioAtualizado = {
        id: usuario.id,
        nome: nome,
        email: email,
        senha: senha,
      };

      navigation.navigate("Home", {
        usuario: usuarioAtualizado,
      });
    }
  }

  async function excluir() {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("usuarios")
              .delete()
              .eq("id", usuario.id);

            if (error) {
              Alert.alert("Erro", "Não foi possível excluir a conta.");
            } else {
              Alert.alert("Sucesso", "Conta excluída!");
              navigation.navigate("Login");
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.saveButton} onPress={salvar}>
        <Text style={styles.buttonText}>Salvar alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={excluir}>
        <Text style={styles.buttonText}>Excluir minha conta</Text>
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
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});