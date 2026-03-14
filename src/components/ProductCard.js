
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.92}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>-{Math.round(product.discountPercentage)}%</Text>
      </View>

      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>

      <Text style={styles.category} numberOfLines={1}>
        {product.category}
      </Text>

      <Text style={styles.price}>$ {product.price}</Text>

      <Text style={styles.link}>Ver detalhes</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#FF6A00",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    minHeight: 38,
  },
  category: {
    fontSize: 12,
    color: "#6B7280",
    textTransform: "capitalize",
    marginTop: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "900",
    color: "#16A34A",
    marginTop: 10,
  },
  link: {
    fontSize: 13,
    fontWeight: "800",
    color: "#2563EB",
    marginTop: 8,
  },
});
