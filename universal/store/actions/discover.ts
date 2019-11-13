import { useDispatch } from 'react-redux'

import { Movie } from '@models/movie'
import { DiscoverActions } from '@models/discover'

export const useDiscoverActions = () => {
  const dispatch = useDispatch()

  const updatePopularMovies = (loading: boolean, newPopularMovies?: Movie[], error?: any) => dispatch<DiscoverActions>({
    type: 'UPDATE_POPULAR_MOVIES',
    payload: {
      error,
      loading,
      popularMovies: newPopularMovies
    }
  })

  const updateTrendingMovies = (loading: boolean, newTrendingMovies?: Movie[], error?: any) => dispatch<DiscoverActions>({
    type: 'UPDATE_TRENDING_MOVIES',
    payload: {
      error,
      loading,
      trendingMovies: newTrendingMovies
    }
  })

  return {
    updatePopularMovies,
    updateTrendingMovies
  }
}
