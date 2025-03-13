import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductsScreen from '../screens/Products';
import ProductDefinition from '../screens/ProductDefinition';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Fridge from '../screens/Fridge';
import Cameras from '../screens/Cameras';
import PrescribedItems from '../screens/PrescribedItems';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Common header options with menu button
const screenOptions = ({ navigation }: any) => ({
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
            <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
    ),
    headerTitleAlign: 'center' as 'center',
});

// Stack Navigator for "Products" Menu
const ProductsStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="ProductDefinition" component={ProductDefinition} />
        </Stack.Navigator>
    );
};

// Drawer Navigator with "Products" as a single menu item
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="Fridge">
                {(props) => (
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen name="Fridge" component={Fridge} />
                    </Stack.Navigator>
                )}
            </Drawer.Screen>
            <Drawer.Screen name="Cameras">
                {(props) => (
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen name="Cameras" component={Cameras} />
                    </Stack.Navigator>
                )}
            </Drawer.Screen>
            <Drawer.Screen name="Products" component={ProductsStack} />
            <Drawer.Screen name="Prescribed Items">
                {(props) => (
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen name="Prescribed Items" component={PrescribedItems} />
                    </Stack.Navigator>
                )}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
