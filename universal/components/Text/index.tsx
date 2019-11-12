import React from 'react'
import { Text } from 'react-native'

interface Props {
  size?: number,
  type?: 'default' | 'semibold' | 'bold',
  color?: 'default',
  center?: boolean
  children?: React.ReactNode,
  numberOfLines?: number
}

const Fonts = {
  default: 'Source Sans Pro',
  semibold: 'Source Sans Pro Bold',
  bold: 'Source Sans Pro Black'
}

const Colors = {
  default: 'white'
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
