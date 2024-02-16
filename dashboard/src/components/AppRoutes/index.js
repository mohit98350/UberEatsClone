import DetailedOrder from "../../modules/DetailedOrder";
import Orders from "../../modules/Orders";
import { Routes, Route } from "react-router-dom";
import RestaurantMenu from "../../modules/RestaurentMenu";
import CreateMenuItem from "../../modules/CreateMenuItem";
import OrderHistory from "../../modules/OrderHistory";
import Settings from "../../modules/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Orders />} />
      <Route path="order/:id" element={<DetailedOrder />} />
      <Route path="menu" element={<RestaurantMenu />} />
      <Route path="menu/create" element={<CreateMenuItem />} />
      <Route path="order-history" element={<OrderHistory />} />
      <Route path="setting" element={<Settings />} />
    </Routes>
  );
};
export default AppRoutes;
