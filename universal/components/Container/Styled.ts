import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const ContainerView = styled.View`
  background: rgb(20, 20, 20);
  flex: 1;
  padding-top: ${getStatusBarHeight() + 10}px;
`

export const Actions = styled.TouchableOpacity`
  padding: 0px 10px 10px;
  flex-direction: row;
  align-items: center;
`

export const Header = styled.View`
  padding: 10px;
`
