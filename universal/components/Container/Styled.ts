import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const ContainerView = styled.View`
  background: rgb(20, 20, 20);
  flex: 1;
  padding-top: ${getStatusBarHeight() + 10}px;
`

export const Actions = styled.View`
  padding: 10px;
`

export const Header = styled.View`
  padding: 10px;
`
