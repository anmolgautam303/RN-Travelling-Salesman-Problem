import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './screens/Home';
import FullScreenMap from './screens/FullScreenMap';
import Directions from './screens/Directions';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  FullScreenMap: {
    screen: FullScreenMap
  },
  Directions: {
    screen: Directions
  }
});

export default createAppContainer(AppNavigator);
