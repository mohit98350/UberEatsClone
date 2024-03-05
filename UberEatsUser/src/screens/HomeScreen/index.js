import { FlatList, StyleSheet, View, BackHandler, Alert } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listRestaurants } from "../../graphql/queries";
import { useRestaurantStore } from "../../store/restaurantStore";

const client = generateClient();
export default function HomeScreen() {
  // const [restaurants, setRestaurants] = useState([]);
  const fetchRestaurants = useRestaurantStore(
    (state) => state.fetchRestaurants
  );

  const restaurants = useRestaurantStore((state) => state.restaurants);
  const isStoredRestaurants = useRestaurantStore(
    (state) => state.isStoredRestaurants
  );

  // console.log("loading from test", loading);
  // console.log("isStoredRestaurants", isStoredRestaurants);

  // const fetchRestaurants = async () => {
  //   const allRestaurants = await client.graphql({
  //     query: listRestaurants,
  //   });
  //   setRestaurants(allRestaurants.data.listRestaurants.items);
  // };
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Are you sure to Exit the app?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!isStoredRestaurants) {
      fetchRestaurants();
    }
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
