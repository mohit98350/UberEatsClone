import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { useRestaurantContext } from "../../context/RestaurantContext";
const SideMenu = () => {
  const navigate = useNavigate();
  const { restaurant } = useRestaurantContext();
  const onClick = async (menuItem) => {
    if (menuItem.key === "signOut") {
      await signOut();
      window.location.reload();
    } else {
      navigate(menuItem.key);
    }
  };

  const mainMenuItems = [
    {
      key: "/",
      label: "Orders",
    },
    {
      key: "menu",
      label: "Menu",
    },
    {
      key: "order-history",
      label: "Order History",
    },
  ];

  const menuItems = [
    ...(restaurant ? mainMenuItems : []),
    {
      key: "setting",
      label: "Settings",
    },
    {
      key: "signOut",
      label: "LogOut",
      danger: "true",
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          margin: 8,
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "600",
          letterSpacing: 0.5,
        }}
      >
        <div>{restaurant && <p>{restaurant.name}</p>}</div>
      </div>
      <Menu items={menuItems} onClick={onClick} />;
    </>
  );
};

export default SideMenu;
