import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'

const iconSizeLarge = 30

export default () => {
  const { navigate, state } = useNavigation()

  const goToDashboard = () => navigate(Screens.Dashboard.ExploreScreen)
  const goToSearch = () => navigate(Screens.Dashboard.SearchScreen)

  const tabs = [{
    name: Screens.Dashboard.ExploreScreen,
    icon: 'md-home',
    size: iconSizeLarge,
    onPress: goToDashboard
  }, {
    name: Screens.Dashboard.SearchScreen,
    icon: 'ios-search',
    size: iconSizeLarge,
    onPress: goToSearch
  }]

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: 'rgb(5, 5, 5)',
      }}
    >
      {tabs.map((tab, index) => {
        const selected = index === state.index

        return (
          <TouchableOpacity
            key={tab.name}
            style={{ height: tab.size, width: tab.size }}
            onPress={tab.onPress}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name={tab.icon} size={tab.size} color={selected ? 'white' : 'rgb(110, 120, 130)'} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
