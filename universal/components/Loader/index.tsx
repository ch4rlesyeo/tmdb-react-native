import React from 'react'
import { View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

interface Props {
  size?: number,
  fullPage?: boolean
}

export default (props: Props) => {
  const { size = 32, fullPage } = props

  return (
    <View style={fullPage && { flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.View
        animation='rotate'
        easing='linear'
        iterationCount='infinite'
        duration={600}
        style={{
          height: size,
          width: size
        }}
      >
        <AntDesign name='loading1' size={size} color='white' />
      </Animatable.View>
    </View>
  )
}
