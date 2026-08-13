import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getBooks } from "../services/api";
import ProductCard from "../components/ProductCard.js";

export default function HomeScreen({ navigation, route }) {
  const { usuario } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setProducts(await getBooks());
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Perfil", { usuario })}
        >
          <Text style={styles.menuText}>Meus dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Livros em destaque</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard product={item} navigation={navigation} />
            )}
            onRefresh={loadProducts}
            refreshing={loading}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  menu: { flexDirection: "row", padding: 10, gap: 10 },
  menuButton: { flex: 1, backgroundColor: "#007BFF", padding: 12, borderRadius: 8 },
  exitButton: { backgroundColor: "#dc3545", padding: 12, borderRadius: 8 },
  menuText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { flex: 1 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 4,
  },
});