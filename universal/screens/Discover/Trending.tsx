import React from 'react'
import { ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Circle, Rect } from 'react-native-svg'

import { Screens } from '@utils/screens'
import { useDiscoverTrending } from '@hooks/useDiscover'
import { Text } from '@components/native'
import { BrowseSection, BrowseSectionTitle } from './Styled'

interface Props {
  imageWidth: number,
  imageHeight: number,
}

const TrendingMoviesView = (props: Props) => {
  const { navigate } = useNavigation()

  const { imageWidth, imageHeight } = props

  const { trendingMovies, loading } = useDiscoverTrending()

  return (
    <BrowseSection>
      <BrowseSectionTitle>
        <Text type='semibold' size={15}>Trending movies</Text>
      </BrowseSectionTitle>
      {loading ? (
        <SvgAnimatedLinearGradient height={300}>
          <Circle cx="30" cy="30" r="30"/>
          <Rect x="75" y="13" rx="4" ry="4" width="100" height="13"/>
          <Rect x="75" y="37" rx="4" ry="4" width="50" height="8"/>
          <Rect x="0" y="70" rx="5" ry="5" width="400" height="200"/>
        </SvgAnimatedLinearGradient>
      ) : (
        <ScrollView horizontal>
          {trendingMovies.map((movie, index) => (
            <TouchableOpacity
              key={index}
              style={{ marginRight: 10, height: imageHeight }}
              activeOpacity={0.6}
              onPress={() => navigate(Screens.View.MovieViewScreen, { movie })}
            >
              <Image source={{ uri: movie.posterUrl }} style={{ width: imageWidth, height: '100%' }} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </BrowseSection>
  )
}

export default TrendingMoviesView
