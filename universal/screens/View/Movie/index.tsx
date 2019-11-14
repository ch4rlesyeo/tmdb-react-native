import React, { useState, useEffect } from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'
import { searchMovieById } from '@utils/queries/movies'
import { Movie } from '@models/movie'
import { Container } from '@components/native'
import MovieView from './View'

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

  return (
    <Container onBack={() => goBack(null)}>
      <MovieView
        movie={movie}
        onSelect={(cast) => navigate(Screens.View.PeopleViewScreen, { people: cast })}
        loading={loading}
      />
    </Container>
  )
}

export default MovieViewScreen
