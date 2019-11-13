import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ReduxState } from '@models/redux'
import { useDiscoverActions } from '@store/actions/discover'
import { getPopularMovies, getTrendingMovies } from '@utils/queries/movies'

export const useDiscoverPopular = () => {
  const { popularMovies, loading } = useSelector((state: ReduxState) => state.discover.popular)

  const { updatePopularMovies } = useDiscoverActions()

  useEffect(() => {
    const fetch = async () => {
      if (!popularMovies || popularMovies.length === 0) {
        updatePopularMovies(true, [])

        const query = await getPopularMovies()

        updatePopularMovies(false, query.popularMovies, query.error)
      }
    }

    fetch()
  }, [])

  return {
    loading,
    popularMovies
  }
}

export const useDiscoverTrending = () => {
  const { trendingMovies, loading } = useSelector((state: ReduxState) => state.discover.trending)

  const { updateTrendingMovies } = useDiscoverActions()

  useEffect(() => {
    const fetch = async () => {
      if (!trendingMovies || trendingMovies.length === 0) {
        updateTrendingMovies(true, [])

        const query = await getTrendingMovies()

        updateTrendingMovies(false, query.trendingMovies, query.error)
      }
    }

    fetch()
  }, [])

  return {
    loading,
    trendingMovies
  }
}
