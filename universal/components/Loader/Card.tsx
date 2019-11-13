import React from 'react'
import { View } from 'react-native'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Rect } from 'react-native-svg'

interface Props {
  width: number,
  height: number,
  duration?: number,
  primaryColor?: string,
  secondaryColor?: string
}

const CardSkeleton = (props: Props) => {
  const {
    width,
    height,
    duration = 1000,
    primaryColor = 'rgb(30, 30, 30)',
    secondaryColor = 'rgb(40, 42, 44)'
  } = props

  return (
    <View style={{ flexDirection: 'row' }}>
      <SvgAnimatedLinearGradient
        height={height}
        width={width + 10}
        duration={duration}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      >
        <Rect x='0' y='0' width={width} height={height} />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={height}
        width={width + 10}
        duration={duration}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      >
        <Rect x='0' y='0' width={width} height={height} />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={height}
        width={width + 10}
        duration={duration}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      >
        <Rect x='0' y='0' width={width} height={height} />
      </SvgAnimatedLinearGradient>
    </View>
  )
}

export default CardSkeleton
