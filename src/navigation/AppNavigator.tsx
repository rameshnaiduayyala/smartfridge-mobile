import { createStackNavigator } from "@react-navigation/stack";
import DashBoard from "../screens/DashBoard";
import Products from "../screens/Products";

type AppStackParamList = {
  Dashboard: undefined;
  Products: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen name="Dashboard" component={DashBoard} />
      <Stack.Screen name="Products" component={Products} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
