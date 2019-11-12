import React, { useEffect, useState } from 'react'
import { StatusBar, View, ScrollView, Image, Dimensions } from 'react-native'
// import moment from 'moment'

import { getPopularMovies, getTrendingMovies } from '@utils/queries/movies'
import { Movie } from '@models/movie'
import { Text } from '@components/native'
import { Container, BrowseSection, BrowseSectionTitle } from './Styled'

interface State {
  error?: any,
  discoverMovies: Movie[],
  trendingMovies: Movie[],
  loading: boolean
}

const BrowseScreen = () => {
  const imageWidth = Dimensions.get('screen').width * 0.25
  const imageHeight = Dimensions.get('screen').height * 0.23

  const [screenState, updateScreenState] = useState<State>({
    discoverMovies: [],
    trendingMovies: [],
    loading: true
  })

  const { discoverMovies, trendingMovies } = screenState

  useEffect(() => {
    const fetchMovies = async () => {
      const { discoverMovies } = await getPopularMovies()
      const { trendingMovies } = await getTrendingMovies()

      updateScreenState({ ...screenState, discoverMovies, trendingMovies, loading: false })
    }

    fetchMovies()
  }, [])
  return (
    <Container>
      <StatusBar barStyle='light-content' />
      <BrowseSection>
        <BrowseSectionTitle>
          <Text type='semibold' size={15}>Trending now</Text>
        </BrowseSectionTitle>
        <ScrollView horizontal>
          {trendingMovies.map((movie, index) => (
            <View key={index} style={{ marginRight: 10, height: imageHeight }}>
              <Image source={{ uri: movie.posterUrl }} style={{ width: imageWidth, height: '100%' }} />
            </View>
          ))}
        </ScrollView>
      </BrowseSection>
      <BrowseSection>
        <BrowseSectionTitle>
          <Text type='semibold' size={15}>Popular movies</Text>
        </BrowseSectionTitle>
        <ScrollView horizontal>
          {discoverMovies.map((movie, index) => (
            <View key={index} style={{ marginRight: 10, height: imageHeight }}>
              <Image source={{ uri: movie.posterUrl }} style={{ width: imageWidth, height: '100%' }} />
            </View>
          ))}
        </ScrollView>
      </BrowseSection>
    </Container>
  )
}

export default BrowseScreen
