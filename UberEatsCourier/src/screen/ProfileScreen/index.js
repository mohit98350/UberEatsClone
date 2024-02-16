import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { generateClient } from "aws-amplify/api";
import { createCourier, updateCourier } from "../../graphql/mutations";
import { TransportMode } from "../../graphql/enums";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const client = generateClient();
const Profile = () => {
  const { sub, setDbCourier, dbCourier } = useAuthContext();
  const [name, setName] = useState(dbCourier?.name || "");
  const [transportMode, setTransportMode] = useState(TransportMode.DRIVING);

  const { signOut } = useAuthenticator();
  const navigation = useNavigation();

  const onSave = async () => {
    console.log("dbCourier", dbCourier);
    if (dbCourier) {
      await update();
    } else {
      await create();
    }
    // navigation.goBack();
  };

  const update = async () => {
    try {
      const updatedCourier = await client.graphql({
        query: updateCourier,
        variables: {
          input: {
            id: dbCourier?.id,
            name: name,
            transportationMode: transportMode,
          },
        },
      });
      setDbCourier(updatedCourier);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const create = async () => {
    try {
      const courier = await client.graphql({
        query: createCourier,
        variables: {
          input: {
            name: name,
            sub: sub,
            transportationMode: transportMode,
          },
        },
      });

      setDbCourier(courier.data.createCourier);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => setTransportMode(TransportMode.BICYCLING)}
          style={{
            backgroundColor:
              transportMode === TransportMode.BICYCLING ? "#3FC060" : "white",
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
          }}
        >
          <MaterialIcons name="pedal-bike" size={80} color="black" />
        </Pressable>
        <Pressable
          onPress={() => setTransportMode(TransportMode.DRIVING)}
          style={{
            backgroundColor:
              transportMode === TransportMode.DRIVING ? "#3FC060" : "white",
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
          }}
        >
          <FontAwesome5 name="car" size={80} color="black" />
        </Pressable>
      </View>
      <View
        style={{
          marginTop: "auto",
          padding: 12,
        }}
      >
        <Button onPress={onSave} title="Save" color={"black"} fontSize={16} />
      </View>

      <Text
        onPress={() => signOut()}
        style={{
          textAlign: "center",
          color: "red",
          margin: 10,
          fontSize: 16,
        }}
      >
        Sign out
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default Profile;
