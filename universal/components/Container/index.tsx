import React from 'react'
import { StatusBar } from 'react-native'
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
        <Actions>
          <Ionicons name='md-arrow-back' size={20} color='white' />
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
