import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { Screens } from '@utils/screens'
import BottomTab from '@components/BottomTab'
import ExploreScreen from '../Explore'
import SearchScreen from '../Search'

export default createAppContainer(createBottomTabNavigator({
  [Screens.Dashboard.ExploreScreen]: {
    screen: ExploreScreen
  },
  [Screens.Dashboard.SearchScreen]: {
    screen: SearchScreen
  }
}, {
  initialRouteName: Screens.Dashboard.ExploreScreen,
  tabBarComponent: (props) => (
    <BottomTab {...props} />
  )
}))
