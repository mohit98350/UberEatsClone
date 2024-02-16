import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
// import amplifyconfig from "./src/amplifyconfiguration.json";
import amplifyconfig from "./src/aws-exports";
import AuthContextProvider from "./src/context/AuthContext";
import BasketContextProvider from "./src/context/BasketContext";
import OrderContextProvider from "./src/context/OrderContext";
Amplify.configure({
  ...amplifyconfig,
  Analytics: {
    disabled: true,
  },
});
function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <RootNavigator />
          </OrderContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>

      <StatusBar style="light" />
    </NavigationContainer>
  );
}
export default withAuthenticator(App);
