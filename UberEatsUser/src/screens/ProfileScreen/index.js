import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/authStore";

const Profile = () => {
  const dbUser = useAuthStore((state) => state.dbUser);
  const sub = useAuthStore((state) => state.authUser);
  const update = useAuthStore((state) => state.updateUser);
  const create = useAuthStore((state) => state.createUser);
  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + " " || "0");
  const [lng, setLng] = useState(dbUser?.lng + " " || "0");
  const { signOut } = useAuthenticator();
  const navigation = useNavigation();

  const updatePayload = {
    dbUser,
    name,
    address,
    lat,
    lng,
  };
  const createPayload = {
    name,
    address,
    lat,
    lng,
    sub,
  };
  const onSave = async () => {
    if (dbUser) {
      await update(updatePayload);
    } else {
      await create(createPayload);
    }
    navigation.goBack();
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
