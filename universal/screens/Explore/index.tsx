import React, { useEffect, useState } from 'react'
import { TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'
import { getPopularMovies, getTrendingMovies } from '@utils/queries/movies'
import { Movie } from '@models/movie'
import { Text, Container, Loader } from '@components/native'
import { BrowseSection, BrowseSectionTitle } from './Styled'

interface State {
  error?: any,
  discoverMovies: Movie[],
  trendingMovies: Movie[],
  loading: boolean
}

const ExploreScreen = () => {
  const { navigate } = useNavigation()

  const imageWidth = Dimensions.get('screen').width * 0.25
  const imageHeight = Dimensions.get('screen').height * 0.23

  const [screenState, updateScreenState] = useState<State>({
    discoverMovies: [],
    trendingMovies: [],
    loading: true
  })

  const { discoverMovies, trendingMovies, loading } = screenState

  useEffect(() => {
    const fetchMovies = async () => {
      updateScreenState({ ...screenState, loading: true })

      const { discoverMovies } = await getPopularMovies()
      const { trendingMovies } = await getTrendingMovies()

      updateScreenState({ ...screenState, discoverMovies, trendingMovies, loading: false })
    }

    fetchMovies()
  }, [])

  return (
    <Container header={{ title: 'Discover', description: 'Trending and popular movies on TMDB' }}>
      {loading ? (
        <Loader fullPage />
      ) : (
        <ScrollView>
          <BrowseSection>
            <BrowseSectionTitle>
              <Text type='semibold' size={15}>Trending movies</Text>
            </BrowseSectionTitle>
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
          </BrowseSection>
          <BrowseSection>
            <BrowseSectionTitle>
              <Text type='semibold' size={15}>Popular movies</Text>
            </BrowseSectionTitle>
            <ScrollView horizontal>
              {discoverMovies.map((movie, index) => (
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
          </BrowseSection>
        </ScrollView>
      )}
    </Container>
  )
}

export default ExploreScreen
