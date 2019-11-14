import React, { useState, useEffect } from 'react'
import { ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'
import { searchMovieById } from '@utils/queries/movies'
import { Movie } from '@models/movie'
import { Container, Text, Loader } from '@components/native'
import { Cover, BasicInfo, Section, CastDetails } from './Styled'

interface State {
  movie?: Movie,
  loading: boolean
}

const MovieViewScreen = () => {
  const { state, navigate, goBack } = useNavigation()

  const movieId = state.params.movie.id

  const [viewState, updateViewState] = useState<State>({
    loading: true,
    movie: undefined
  })

  const { loading, movie } = viewState

  useEffect(() => {
    const fetch = async () => {
      updateViewState({ ...viewState, loading: true })

      const { result } = await searchMovieById(movieId)

      updateViewState({ ...viewState, loading: false, movie: result })
    }

    fetch()
  }, [movieId])

  if (loading) {
    return (
      <Container>
        <Loader fullPage />
      </Container>
    )
  }

  const imageWidth = Dimensions.get('screen').width * 0.5
  const imageHeight = Dimensions.get('screen').height * 0.45

  const castImageWidth = Dimensions.get('screen').width * 0.23
  const castImageHeight = Dimensions.get('screen').height * 0.21

  return (
    <Container onBack={() => goBack(null)}>
      <ScrollView>
        <Cover.Container>
          <Cover.BlurImage>
            <Image source={{ uri: movie.posterUrl }} style={{ width: '100%', height: imageHeight }} blurRadius={30} />
          </Cover.BlurImage>
          <Cover.Image>
            <Image source={{ uri: movie.posterUrl }} style={{ width: imageWidth, height: imageHeight }} />
          </Cover.Image>
        </Cover.Container>
        <BasicInfo.Container>
          <Text type='bold' size={24} center>{movie.title}</Text>
          <BasicInfo.Secondary>
            <BasicInfo.SecondaryItem>
              <Text size={17} color='light'>{moment(movie.releaseDate).format('YYYY')}</Text>
            </BasicInfo.SecondaryItem>
            <BasicInfo.SecondaryItem>
              <Text size={17} color='light'>{Math.floor((movie.duration / 60))}h {(movie.duration % 60)}m</Text>
            </BasicInfo.SecondaryItem>
          </BasicInfo.Secondary>
        </BasicInfo.Container>
        <Section.Container>
          <Section.Name>
            <Text type='semibold' size={18}>Overview</Text>
          </Section.Name>
          <Text size={15} color='light' numberOfLines={6}>{movie.description}</Text>
        </Section.Container>
        <Section.Container>
          <Section.Name>
            <Text type='semibold' size={18}>Cast</Text>
          </Section.Name>
          <ScrollView horizontal>
            {movie.casts && movie.casts.map((cast, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginRight: 10, width: castImageWidth }}
                activeOpacity={0.6}
                onPress={() => navigate(Screens.View.PeopleViewScreen, { people: cast })}
              >
                <Image source={{ uri: cast.profileUrl }} style={{ width: '100%', height: castImageHeight }} />
                <CastDetails>
                  <Text center>{cast.name}</Text>
                  <Text center color='light'>{cast.characterName}</Text>
                </CastDetails>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Section.Container>
      </ScrollView>
    </Container>
  )
}

export default MovieViewScreen
