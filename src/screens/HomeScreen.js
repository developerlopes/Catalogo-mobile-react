
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

const CATEGORY_GROUPS = {
  Masculino: [
    { label: "Camisas", value: "mens-shirts" },
    { label: "Sapatos", value: "mens-shoes" },
    { label: "Relógios", value: "mens-watches" },
  ],
  Feminino: [
    { label: "Bolsas", value: "womens-bags" },
    { label: "Vestidos", value: "womens-dresses" },
    { label: "Joias", value: "womens-jewellery" },
    { label: "Sapatos", value: "womens-shoes" },
    { label: "Relógios", value: "womens-watches" },
  ],
};

export default function HomeScreen({ navigation }) {
  const [group, setGroup] = useState("Masculino");
  const [category, setCategory] = useState("mens-shirts");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => CATEGORY_GROUPS[group], [group]);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/category/${category}`);
      setProducts(response.data.products || []);
    } catch (error) {
      alert("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!categories.some((item) => item.value === category)) {
      setCategory(categories[0].value);
    }
  }, [group]);

  return (
    <View style={styles.container}>
      <View style={styles.topSwitch}>
        <TouchableOpacity
          style={[styles.groupButton, group === "Masculino" && styles.groupButtonActive]}
          onPress={() => {
            setGroup("Masculino");
            setCategory("mens-shirts");
          }}
        >
          <Text style={[styles.groupButtonText, group === "Masculino" && styles.groupButtonTextActive]}>
            Masculino
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.groupButton, group === "Feminino" && styles.groupButtonActive]}
          onPress={() => {
            setGroup("Feminino");
            setCategory("womens-bags");
          }}
        >
          <Text style={[styles.groupButtonText, group === "Feminino" && styles.groupButtonTextActive]}>
            Feminino
          </Text>
        </TouchableOpacity>
      </View>

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.tabsRow}
  style={styles.tabsContainer}
>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[styles.tabButton, category === item.value && styles.tabButtonActive]}
            onPress={() => setCategory(item.value)}
          >
<Text
  numberOfLines={1}
  adjustsFontSizeToFit
  style={[styles.tabText, category === item.value && styles.tabTextActive]}
>
  {item.label}
</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size={40} />
          <Text style={styles.loaderText}>Carregando produtos...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.banner}>
              <Text style={styles.bannerTitle}>Ofertas da categoria</Text>
              <Text style={styles.bannerSubtitle}>Toque em um produto para ver os detalhes.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("Details", { id: item.id })}
            />
          )}
          refreshing={loading}
          onRefresh={loadProducts}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  topSwitch: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 12,
    gap: 10,
  },
  groupButton: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    paddingVertical: 12,
    alignItems: "center",
  },
  groupButtonActive: {
    backgroundColor: "#2563EB",
  },
  groupButtonText: {
    color: "#374151",
    fontWeight: "800",
    fontSize: 14,
  },
  groupButtonTextActive: {
    color: "#FFFFFF",
  },
tabsRow: {
  paddingHorizontal: 12,
  paddingVertical: 10,
  alignItems: "center",
},

tabButton: {
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  paddingHorizontal: 18,
  height: 44,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#E5E7EB",
  marginRight: 8,
  alignSelf: "center",
},

tabButtonActive: {
  backgroundColor: "#2563EB",
  borderColor: "#2563EB",
},

tabText: {
  color: "#374151",
  fontSize: 13,
  fontWeight: "700",
},

tabTextActive: {
  color: "#FFFFFF",
},

tabsContainer: {
  maxHeight: 70,
},
  banner: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },
  bannerSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
  },
  listContent: {
    padding: 8,
    paddingBottom: 24,
  },
  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 14,
  },
});
