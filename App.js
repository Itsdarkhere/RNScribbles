import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResultScreen from './screens/ResultScreen';
import DrawScreen from './screens/DrawScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Draw" 
            component={DrawScreen} 
            options={{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="Result" 
            component={ResultScreen} 
            options={{
              headerShown: false
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
