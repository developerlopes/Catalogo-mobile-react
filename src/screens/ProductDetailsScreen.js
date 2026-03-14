
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import api from "../services/api";

export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        alert("Erro ao carregar detalhes do produto.");
      }
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size={40} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageCard}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
      </View>

      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>$ {product.price}</Text>
        <Text style={styles.discount}>-{Math.round(product.discountPercentage)}%</Text>
      </View>

      <Text style={styles.sectionTitle}>Descrição</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.sectionTitle}>Categoria</Text>
      <Text style={styles.meta}>{product.category}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  imageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    marginTop: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    gap: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "900",
    color: "#16A34A",
  },
  discount: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FF6A00",
    backgroundColor: "#FFF1EB",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    marginTop: 22,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
  },
  meta: {
    fontSize: 15,
    color: "#4B5563",
    textTransform: "capitalize",
  },
});
