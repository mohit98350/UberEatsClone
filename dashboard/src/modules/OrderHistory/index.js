import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useRestaurantContext } from "../../context/RestaurantContext";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listOrders } from "../../graphql/queries";

const client = generateClient();

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const { restaurant } = useRestaurantContext();

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
              { status: { eq: "PICKED_UP" } },
              { status: { eq: "COMPLETED" } },
              { status: { eq: "DECLINED_BY_RESTAURANT" } },
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

  const renderOrderStatus = (orderStatus) => {
    const statusToColor = {
      PICKED_UP: "orange",
      COMPLETED: "green",
      DECLINED_BY_RESTAURANT: "red",
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
    <Card title={"Orders History"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`/order/${orderItem.id}`),
        })}
      />
    </Card>
  );
};
export default OrderHistory;
