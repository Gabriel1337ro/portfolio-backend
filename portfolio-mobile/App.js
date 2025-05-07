import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import ProjectDetailsScreen from './src/screens/ProjectDetailsScreen';
import ContactScreen from './src/screens/ContactScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProjectDetails" 
        component={ProjectDetailsScreen}
        options={({ route }) => ({ title: route.params.project.title })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Contact') {
              iconName = focused ? 'mail' : 'mail-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack}
          options={{ 
            headerShown: false,
            title: 'Home'
          }}
        />
        <Tab.Screen 
          name="Contact" 
          component={ContactScreen}
          options={{
            title: 'Contact'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 