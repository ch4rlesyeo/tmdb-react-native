import styled from 'styled-components/native'

interface LoadingViewProps {
  height: number
}

export const LoadingView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${(props: LoadingViewProps) => props.height}px;
`

export const BrowseSection = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
`

export const BrowseSectionTitle = styled.View`
  padding-bottom: 10px;
`
