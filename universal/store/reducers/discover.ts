import { DiscoverState, DiscoverActions } from '@models/discover'

const initialState: DiscoverState = {
  popular: {
    loading: true,
    popularMovies: []
  },
  trending: {
    loading: true,
    trendingMovies: []
  }
}

export default (state: DiscoverState = initialState, action: DiscoverActions): DiscoverState => {
  switch (action.type) {
    case 'UPDATE_POPULAR_MOVIES':
      return {
        ...state,
        popular: {
          error: action.payload.error,
          loading: action.payload.loading,
          popularMovies: action.payload.popularMovies
        }
      }
    case 'UPDATE_TRENDING_MOVIES':
      return {
        ...state,
        trending: {
          error: action.payload.error,
          loading: action.payload.loading,
          trendingMovies: action.payload.trendingMovies
        }
      }
    default:
      return state
  }
}
