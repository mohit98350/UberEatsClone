import { FlatList, StyleSheet, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listRestaurants } from "../../graphql/queries";

const client = generateClient();
export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const allRestaurants = await client.graphql({
      query: listRestaurants,
    });
    setRestaurants(allRestaurants.data.listRestaurants.items);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
