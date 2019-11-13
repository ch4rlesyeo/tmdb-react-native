import React from 'react'
import { debounce } from 'lodash'
import { View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { TextBox } from './Styled'

const iconSize = 20

interface Props {
  onChange?: (newValue: string) => void
}

export default class extends React.Component<Props> {
  constructor (props) {
    super(props)

    this.onTextChange = debounce(this.onTextChange, 500)
  }

  onTextChange = (newValue: string) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(newValue)
    }
  }

  render () {
    return (
      <TextBox>
        <View style={{ width: iconSize, height: iconSize }}>
          <Ionicons name='ios-search' size={iconSize} color='rgb(120, 130, 140)' />
        </View>
        <TextInput
          style={{
            color: 'white',
            padding: 10,
            fontSize: 16,
            flexGrow: 1,
            fontFamily: 'Source Sans Pro'
          }}
          autoFocus
          keyboardAppearance='dark'
          onChangeText={this.onTextChange}
          autoCapitalize='none'
          placeholder='Search a movie here...'
          placeholderTextColor='rgb(120, 130, 140)'
        />
      </TextBox>
    )
  }
}
