import React, { useState, useEffect } from 'react'
import { registerRootComponent } from 'expo'
import { View } from 'react-native'
import * as Font from 'expo-font'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Screens } from '@utils/screens'
import DashboardScreen from './Dashboard'
import MovieViewScreen from './View/Movie'
import PeopleViewScreen from './View/People'

const AppContainer = createAppContainer(createStackNavigator({
  [Screens.Dashboard.DefaultScreen]: {
    screen: DashboardScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [Screens.View.MovieViewScreen]: {
    screen: MovieViewScreen,
    navigationOptions: {
      header: null
    }
  },
  [Screens.View.PeopleViewScreen]: {
    screen: PeopleViewScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: Screens.Dashboard.DefaultScreen
}))

const MainScreen = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Source Sans Pro': require('../../assets/fonts/SourceSansPro-Regular.ttf'),
        'Source Sans Pro SemiBold': require('../../assets/fonts/SourceSansPro-SemiBold.ttf'),
        'Source Sans Pro Bold': require('../../assets/fonts/SourceSansPro-Bold.ttf')
      })

      setMounted(true)
    }

    loadFont()
  }, [Font])

  if (!mounted) {
    return (
      <View />
    )
  }

  return (
    <AppContainer />
  )
}

export default registerRootComponent(MainScreen)
