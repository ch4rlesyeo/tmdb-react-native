import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const Container = styled.View`
  background: rgb(0, 10, 20);
  flex: 1;
  padding-top: ${getStatusBarHeight() + 10}px;
`

export const BrowseSection = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  margin-bottom: 20px;
`

export const BrowseSectionTitle = styled.View`
  padding-bottom: 10px;
`
