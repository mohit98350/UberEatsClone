import { Text, View, Image, Pressable, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { getUser } from "../../graphql/queries";

const client = generateClient();

const OrderItem = ({ order }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const fetchOrderUser = async () => {
    try {
      const oneUser = await client.graphql({
        query: getUser,
        variables: { id: order.userID },
      });
      setUser(oneUser.data.getUser);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    if (order) {
      fetchOrderUser();
    }
  }, [order]);

  return (
    <Pressable
      style={{
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#3FC060",
        margin: 10,
      }}
      onPress={() =>
        navigation.navigate("orderDeliveryScreen", { id: order.id })
      }
    >
      <Image
        source={{ uri: order.Restaurant?.image }}
        style={{
          width: "25%",
          height: "100%",
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,
        }}
      />
      <View style={{ flex: 1, marginLeft: 10, paddingVertical: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          {order.Restaurant?.name}
        </Text>
        <Text style={{ color: "grey" }}>{order.Restaurant?.address}</Text>
        <Text style={{ marginTop: 10 }}>Delivery Details</Text>
        <Text style={{ color: "grey" }}>{user?.name}</Text>
        <Text style={{ color: "grey" }}>{user?.address}</Text>
      </View>
      <View
        style={{
          padding: 5,
          backgroundColor: "#3FC060",
          borderBottomRightRadius: 8,
          borderTopRightRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Entypo
          name="check"
          size={30}
          color={"white"}
          style={{ marginLeft: "auto" }}
        />
      </View>
    </Pressable>
  );
};
export default OrderItem;
