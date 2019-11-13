import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { Screens } from '@utils/screens'
import BottomTab from '@components/BottomTab'
import DiscoverScreen from '../Discover'
import SearchScreen from '../Search'

export default createAppContainer(createBottomTabNavigator({
  [Screens.Dashboard.DiscoverScreen]: {
    screen: DiscoverScreen
  },
  [Screens.Dashboard.SearchScreen]: {
    screen: SearchScreen
  }
}, {
  initialRouteName: Screens.Dashboard.DiscoverScreen,
  tabBarComponent: (props) => (
    <BottomTab {...props} />
  )
}))
