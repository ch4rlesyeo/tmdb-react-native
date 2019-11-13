import React from 'react'
import { View, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Text from '../Text'
import { ContainerView, Actions, Header } from './Styled'

interface Props {
  header?: {
    title: string,
    description: string
  },
  onBack?: () => void,
  children: any
}

export default (props: Props) => {
  const { children, header, onBack } = props

  return (
    <ContainerView>
      <StatusBar barStyle='light-content' />
      {onBack && (
        <Actions onPress={onBack}>
          <View style={{ width: 24, height: 24, paddingRight: 10 }}>
            <Ionicons name='md-arrow-back' size={24} color='white' />
          </View>
          <Text type='semibold' size={15}>Back</Text>
        </Actions>
      )}
      {header && (
        <Header>
          <Text type='bold' size={32}>{header.title}</Text>
          <Text size={16} color='light'>{header.description}</Text>
        </Header>
      )}
      {children}
    </ContainerView>
  )
}
