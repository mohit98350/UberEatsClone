import { Button, Card, Table, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { listDishes } from "../../graphql/queries";
import { deleteDish } from "../../graphql/mutations";
import { useRestaurantContext } from "../../context/RestaurantContext";

const client = generateClient();
const RestaurantMenu = () => {
  const { restaurant } = useRestaurantContext();
  const [dishes, setDishes] = useState();

  useEffect(() => {
    const fetchDish = async () => {
      const Dish = await client.graphql({
        query: listDishes,
        variables: {
          filter: {
            restaurantID: {
              eq: restaurant.id,
            },
          },
        },
      });

      setDishes(Dish.data.listDishes.items);
    };
    if (!restaurant?.id) {
      return;
    }
    fetchDish();
  }, [restaurant?.id]);

  const deleteMenuDish = async (dish) => {
    await client.graphql({
      query: deleteDish,
      variables: {
        input: {
          id: dish.id,
        },
      },
    });
    setDishes(dishes.filter((d) => d.id !== dish.id));
  };
  const tableColumns = [
    {
      title: "Menu Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price}$`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Popconfirm
          placement="topLeft"
          title={"Are you sure you want to delete this dish?"}
          onConfirm={() => deleteMenuDish(item)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  const renderNewItemButton = () => (
    <Link to={"create"}>
      <Button type="primary">New Item</Button>
    </Link>
  );

  return (
    <Card title={"Menu"} style={{ margin: 20 }} extra={renderNewItemButton()}>
      <Table dataSource={dishes} columns={tableColumns} rowKey="id" />
    </Card>
  );
};
export default RestaurantMenu;
