/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AuthProvider , useAuth } from './Pages/Context/AuthContext';
import { DietPageNavigator , WelcomeNavigator } from './Pages/Navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';

const RootNavigation = () => {
  const { user } = useAuth();

  return user ? <DietPageNavigator /> : <WelcomeNavigator />;
};

function App(): React.JSX.Element {
  return (
    <AuthProvider>
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  </AuthProvider>
  );
}


export default App;
