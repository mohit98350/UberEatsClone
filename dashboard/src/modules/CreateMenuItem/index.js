import { Form, Input, Button, Card, InputNumber, message } from "antd";
import { generateClient } from "aws-amplify/api";
import { createDish } from "../../graphql/mutations";
import { useRestaurantContext } from "../../context/RestaurantContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const client = generateClient();
const { TextArea } = Input;

const CreateMenuItem = () => {
  const { restaurant } = useRestaurantContext();
  const navigation = useNavigate();
  const onFinish = async ({ name, description, price }) => {
    try {
      await client.graphql({
        query: createDish,
        variables: {
          input: {
            name: name,
            image:
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
            description: description,
            price: price,
            restaurantID: restaurant.id,
          },
        },
      });
      navigation("/menu");
      message.success("Dish has been added!!");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  return (
    <Card title="New Menu Item" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Dish Name"
          name="name"
          rules={[{ required: true }]}
          required
        >
          <Input placeholder="Enter dish name" />
        </Form.Item>
        <Form.Item
          label="Dish Description"
          name="description"
          rules={[{ required: true }]}
          required
        >
          <TextArea rows={4} placeholder="Enter dish description" />
        </Form.Item>
        <Form.Item
          label="Price ($)"
          name="price"
          rules={[{ required: true }]}
          required
        >
          <InputNumber />
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
export default CreateMenuItem;
