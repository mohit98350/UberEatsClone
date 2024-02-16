import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { generateClient } from "aws-amplify/api";
import { createUser, updateUser } from "../../graphql/mutations";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const client = generateClient();
const Profile = () => {
  const { sub, setDbUser, dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + " " || "0");
  const [lng, setLng] = useState(dbUser?.lng + " " || "0");

  const { signOut } = useAuthenticator();
  const navigation = useNavigation();

  const onSave = async () => {
    if (dbUser) {
      await update();
    } else {
      await create();
    }
    navigation.goBack();
  };

  const update = async () => {
    const updatedUser = await client.graphql({
      query: updateUser,
      variables: {
        input: {
          id: dbUser?.id,
          name: name,
          address: address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
      },
    });

    setDbUser(updatedUser);
  };

  const create = async () => {
    try {
      const user = await client.graphql({
        query: createUser,
        variables: {
          input: {
            name: name,
            address: address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            sub: sub,
          },
        },
      });

      setDbUser(user.data.createUser);
    } catch (e) {
      Alert.alert("Error", e.message);
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
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
        keyboardType="numeric"
      />
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
        style={{ textAlign: "center", color: "red", margin: 10 }}
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
