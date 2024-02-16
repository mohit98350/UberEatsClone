import { Card, Descriptions, Divider, List, Button, Spin, Tag } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { getOrder, getUser, listOrderDishes } from "../../graphql/queries";
import { updateOrder } from "../../graphql/mutations";
import { useRestaurantContext } from "../../context/RestaurantContext";
const client = generateClient();
const DetailedOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [dishes, setDishes] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      const oneOrder = await client.graphql({
        query: getOrder,
        variables: {
          id: id,
        },
      });
      setOrder(oneOrder.data.getOrder);
    };
    if (!id) {
      return;
    }
    fetchOrder();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      const oneUser = await client.graphql({
        query: getUser,
        variables: {
          id: order.userID,
        },
      });
      setCustomer(oneUser.data.getUser);
    };
    if (order?.userID) {
      fetchUser();
    }
  }, [order?.userID]);

  useEffect(() => {
    const fetchOrderItem = async () => {
      const OrderDish = await client.graphql({
        query: listOrderDishes,
        variables: {
          filter: {
            orderID: {
              eq: order.id,
            },
          },
        },
      });

      setDishes(OrderDish.data.listOrderDishes.items);
    };
    if (!order?.id) {
      return;
    }
    fetchOrderItem();
  }, [order?.id]);

  const renderOrderStatus = (orderStatus) => {
    const statusToColor = {
      NEW: "green",
      COOKING: "orange",
      READY_FOR_PICKUP: "red",
      ACCEPTED: "purple",
    };

    return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>;
  };
  const renderStatus = () => renderOrderStatus(order.status);

  const acceptOrder = async () => {
    await updateOrderStatus("COOKING");
  };
  const declineOrder = async () => {
    await updateOrderStatus("DECLINED_BY_RESTAURANT");
  };
  const readyForPickup = async () => {
    await updateOrderStatus("READY_FOR_PICKUP");
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      const updatedOrder = await client.graphql({
        query: updateOrder,
        variables: {
          input: {
            id: order.id,
            status: newStatus,
          },
        },
      });
      setOrder(updatedOrder.data.updateOrder);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  if (!order) {
    return (
      <Spin
        size="large"
        style={{
          position: "absolute",
          left: "10vw",
          right: 0,
          top: "50vh",
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  return (
    <Card title={`Order ${id}`} style={{ margin: 20 }} extra={renderStatus()}>
      <Descriptions
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Customer">{customer?.name}</Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          {customer?.address}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <List
        dataSource={dishes}
        renderItem={(dishItem) => (
          <List.Item>
            <div style={{ fontWeight: "bold" }}>
              {dishItem.Dish.name} x {dishItem.quantity}
            </div>

            <div> ${dishItem.Dish.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total</h2>
        <h2 style={styles.totalPrice}>${order?.total.toFixed(2)}</h2>
      </div>
      <Divider />
      {order.status === "NEW" && (
        <div style={styles.buttonContainer}>
          <Button
            block
            type="danger"
            size="large"
            style={styles.button}
            onClick={declineOrder}
          >
            Decline Order
          </Button>
          <Button
            block
            type="primary"
            size="large"
            style={styles.button}
            onClick={acceptOrder}
          >
            Accept Order
          </Button>
        </div>
      )}
      {order.status === "COOKING" && (
        <Button block type="primary" size="large" onClick={readyForPickup}>
          Food Is Done
        </Button>
      )}
    </Card>
  );
};

const styles = {
  totalSumContainer: {
    flexDirection: "row",
    display: "flex",
  },
  totalPrice: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
};

export default DetailedOrder;
