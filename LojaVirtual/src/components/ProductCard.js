import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ProductCard({ product, navigation }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { product })}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
      {product.author ? (
        <Text style={styles.author} numberOfLines={1}>
          {product.author}
        </Text>
      ) : null}
      <Text style={styles.price}>R$ {product.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  image: { width: 120, height: 120, resizeMode: "contain" },
  title: { marginTop: 10, fontWeight: "bold", textAlign: "center" },
  author: { marginTop: 6, color: "#666", textAlign: "center" },
  price: { marginTop: 10, color: "green", fontSize: 18 },
});