import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listOrders } from "../../graphql/queries";
import { useRestaurantContext } from "../../context/RestaurantContext";
import * as subscriptions from "../../graphql/subscriptions";

const client = generateClient();
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { restaurant } = useRestaurantContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await client.graphql({
        query: listOrders,
        variables: {
          filter: {
            orderRestaurantId: {
              eq: restaurant?.id,
            },
            or: [
              { status: { eq: "NEW" } },
              { status: { eq: "COOKING" } },
              { status: { eq: "READY_FOR_PICKUP" } },
              { status: { eq: "ACCEPTED" } },
            ],
          },
        },
      });
      setOrders(allOrders.data.listOrders.items);
    };
    if (!restaurant) {
      return;
    }
    fetchOrders();
  }, [restaurant]);

  // FILTER INPUT IS NOT WORKING FOR THIS SUBSCRIPTION

  useEffect(() => {
    const subscription = client
      .graphql({
        query: subscriptions.onCreateOrder,
      })
      .subscribe({
        next: ({ data }) => {
          if (data.onCreateOrder.orderRestaurantId === restaurant?.id) {
            setOrders((existingOrders) => [
              data.onCreateOrder,
              ...existingOrders,
            ]);
          }
        },
        error: (error) => console.log(error),
      });

    return () => subscription.unsubscribe();
  }, []);

  const renderOrderStatus = (orderStatus) => {
    const statusToColor = {
      NEW: "green",
      COOKING: "orange",
      READY_FOR_PICKUP: "red",
      ACCEPTED: "purple",
    };

    return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>;
  };
  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Price",
      dataIndex: "total",
      key: "total",
      render: (price) => `${price.toFixed(2)}$`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderOrderStatus,
    },
  ];

  return (
    <Card title={"Orders"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="orderID"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.id}`),
        })}
      />
    </Card>
  );
};

export default Orders;
