import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.author}>por {product.author}</Text>
        <Text style={styles.price}>R$ {product.price}</Text>
        <Text style={styles.label}>Categoria:</Text>
        <Text>{product.category}</Text>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: 250, height: 250, resizeMode: "contain", alignSelf: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 20 },
  author: { fontSize: 16, color: "#666", marginTop: 8 },
  price: { fontSize: 24, color: "green", marginVertical: 15 },
  label: { fontWeight: "bold", marginTop: 18 },
  description: { marginTop: 8, textAlign: "justify" },
});