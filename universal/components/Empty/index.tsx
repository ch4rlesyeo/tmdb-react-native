import React from 'react'
import { View } from 'react-native'

import Text from '../Text'

interface Props {
  title: string,
  description: string
}

export default (props: Props) => {
  const { title, description } = props

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text type='bold' size={24}>{title}</Text>
      <View style={{ paddingTop: 10 }}>
        <Text center color='light' size={17}>{description}</Text>
      </View>
    </View>
  )
}
