import React from 'react'
import { ScrollView, Dimensions } from 'react-native'

import { Container } from '@components/native'
import PopularMovies from './Popular'
import TrendingMovies from './Trending'

const DiscoverScreen = () => {
  const imageWidth = Dimensions.get('screen').width * 0.25
  const imageHeight = Dimensions.get('screen').height * 0.23

  return (
    <Container header={{ title: 'Discover', description: 'Trending and popular movies on TMDB' }}>
      <ScrollView>
        <TrendingMovies imageWidth={imageWidth} imageHeight={imageHeight} />
        <PopularMovies imageWidth={imageWidth} imageHeight={imageHeight} />
      </ScrollView>
    </Container>
  )
}

export default DiscoverScreen
