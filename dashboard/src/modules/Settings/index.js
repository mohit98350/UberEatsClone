import React, { useEffect, useState } from "react";
import { Form, Input, Card, Button, message } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { generateClient } from "aws-amplify/api";
import { createRestaurant, updateRestaurant } from "../../graphql/mutations";
import { useRestaurantContext } from "../../context/RestaurantContext";

const client = generateClient();

const Settings = () => {
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [name, setName] = useState(null);
  const { sub, restaurant, setRestaurant } = useRestaurantContext();

  const getAddressLatLng = async (address) => {
    setAddress(address);
    const geocodedByAddress = await geocodeByAddress(address.label);
    const latLng = await getLatLng(geocodedByAddress[0]);

    setCoordinates(latLng);
  };

  const onSubmit = async () => {
    if (!restaurant) {
      await create();
    } else {
      await update();
    }
  };

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name);
      setCoordinates({ lat: restaurant.lat, lng: restaurant.lng });
    }
  }, [restaurant]);

  const create = async () => {
    try {
      const newRestaurant = await client.graphql({
        query: createRestaurant,
        variables: {
          input: {
            name: name,
            image:
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
            deliveryFee: 45,
            minDeliveryTime: 10,
            maxDeliveryTime: 30,
            address: address.label,
            lng: coordinates.lng,
            lat: coordinates.lat,
            adminSub: sub,
          },
        },
      });

      setRestaurant(newRestaurant.data.createRestaurant);
      message.success("Restaurant has been created!!");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const update = async () => {
    try {
      const updatedRestaurant = await client.graphql({
        query: updateRestaurant,
        variables: {
          input: {
            id: restaurant?.id,
            name: name,
            ...(address
              ? {
                  address: address.label,
                  lng: coordinates.lng,
                  lat: coordinates.lat,
                }
              : {}),
          },
        },
      });
      setRestaurant(updatedRestaurant.data.updateRestaurant);
      message.success("Restaurant has been updated!!");
    } catch (error) {
      console.log("Error", error.errors[0].message);
    }
  };
  return (
    <Card title="Restaurant Details" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 8 }} onFinish={onSubmit}>
        <Form.Item label="Restaurant Name" required>
          <Input
            placeholder="Enter restaurant name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Restaurant Address" required>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            selectProps={{
              value: address,
              onChange: getAddressLatLng,
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Settings;
