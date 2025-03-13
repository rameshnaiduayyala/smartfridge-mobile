import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawerContent = (props: any) => {
  const { navigation } = props;
  const [isProductsExpanded, setProductsExpanded] = useState(false);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Sidebar Menu</Text>
      </View>

      {/* Fridge */}
      <DrawerItem label="Fridge" onPress={() => navigation.navigate('Fridge')} />

      {/* Cameras */}
      <DrawerItem label="Cameras" onPress={() => navigation.navigate('Cameras')} />

      {/* Products Dropdown */}
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setProductsExpanded(!isProductsExpanded)}
      >
        <Text >Products</Text>
        <Ionicons name={isProductsExpanded ? "chevron-up" : "chevron-down"} size={20} />
      </TouchableOpacity>

      {isProductsExpanded && (
        <View style={styles.subMenu}>
          <DrawerItem label="Products Screen" onPress={() => navigation.navigate('Products')} />
          <DrawerItem label="Product Definition" onPress={() => navigation.navigate('Products', { screen: 'ProductDefinition' })} />
          </View>
      )}

      {/* Prescribed Items */}
      <DrawerItem label="Prescribed Items" onPress={() => navigation.navigate('Prescribed Items')} />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Auth')}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  dropdownHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
//   dropdownTitle: { fontSize: 16 },
  subMenu: { paddingLeft: 20 },
  logoutButton: { padding: 15, backgroundColor: '#d9534f', borderRadius: 5, alignSelf: 'center', marginTop: 20, width: '90%' },
  logoutText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});