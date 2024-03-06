import { View, Text, Image, ActivityIndicator } from "react-native";
import styles from "./styles";

const DEFAULT_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg";

const RestaurentHeader = ({ restaurent }) => {
  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: restaurent?.image.startsWith("http")
            ? restaurent?.image
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{restaurent.name}</Text>
        <Text style={styles.subtitle}>
          ${restaurent.deliveryFee.toFixed(1)} &#8226;{" "}
          {restaurent.minDeliveryTime}-{restaurent.maxDeliveryTime} min
        </Text>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </View>
  );
};

export default RestaurentHeader;
