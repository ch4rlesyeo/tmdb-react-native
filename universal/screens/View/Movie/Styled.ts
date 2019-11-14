import styled from 'styled-components/native'

export const Cover = {
  Container: styled.View`
    position: relative;
  `,
  BlurImage: styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  Image: styled.View`
    align-items: center;
    justify-content: center;
  `
}

export const BasicInfo = {
  Container: styled.View`
    padding: 10px;
    padding-top: 20px;
    align-items: center;
  `,
  Secondary: styled.View`
    padding-top: 20px;
    flex-direction: row;
    justify-content: space-around;
  `,
  SecondaryItem: styled.View`
    padding: 0 10px;
  `
}

export const Section = {
  Container: styled.View`
    padding: 10px;
    padding-top: 20px;
  `,
  Name: styled.View`
    padding-bottom: 10px;
  `
}

export const CastDetails = styled.View`
  padding-top: 5px;
`
