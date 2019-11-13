import React from 'react'
import { Text } from 'react-native'

interface Props {
  size?: number,
  type?: 'default' | 'semibold' | 'bold',
  color?: 'default' | 'light',
  center?: boolean
  children?: React.ReactNode,
  numberOfLines?: number
}

const Fonts = {
  default: 'Source Sans Pro',
  semibold: 'Source Sans Pro SemiBold',
  bold: 'Source Sans Pro Bold'
}

const Colors = {
  default: 'white',
  light: 'rgb(140, 150, 160)'
}

export default (props: Props) => {
  const { size = 14.222, type = 'default', children, color = 'default', numberOfLines, center } = props

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        fontSize: size,
        fontFamily: Fonts[type],
        color: Colors[color],
        textAlign: center? 'center' : 'left'
      }}
    >
      {children}
    </Text>
  )
}
