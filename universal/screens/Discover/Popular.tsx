import React from 'react'
import { ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'
import { useDiscoverPopular } from '@hooks/useDiscover'
import { Text, Loader } from '@components/native'
import { BrowseSection, BrowseSectionTitle, LoadingView } from './Styled'

interface Props {
  imageWidth: number,
  imageHeight: number,
}

const PopularMoviesView = (props: Props) => {
  const { navigate } = useNavigation()

  const { imageWidth, imageHeight } = props

  const { popularMovies = [], loading } = useDiscoverPopular()

  return (
    <BrowseSection>
      <BrowseSectionTitle>
        <Text type='semibold' size={15}>Popular movies</Text>
      </BrowseSectionTitle>
      {loading ? (
        <LoadingView height={imageHeight}>
          <Loader />
        </LoadingView>
      ) : (
        <ScrollView horizontal>
          {popularMovies.map((movie, index) => (
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

export default PopularMoviesView
