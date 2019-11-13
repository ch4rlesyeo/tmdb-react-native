import { Movie } from './movie'

export interface DiscoverState {
  popular: {
    error?: any,
    loading: boolean,
    popularMovies?: Movie[]
  },
  trending: {
    error?: any,
    loading: boolean,
    trendingMovies?: Movie[]
  }
}

const UPDATE_POPULAR_MOVIES = 'UPDATE_POPULAR_MOVIES'
const UPDATE_TRENDING_MOVIES = 'UPDATE_TRENDING_MOVIES'

export interface UpdatePopularMoviesAction {
  type: typeof UPDATE_POPULAR_MOVIES,
  payload: {
    error?: any,
    loading: boolean,
    popularMovies?: Movie[]
  }
}

export interface UpdateTrendingMoviesAction {
  type: typeof UPDATE_TRENDING_MOVIES,
  payload: {
    error?: any,
    loading: boolean,
    trendingMovies?: Movie[]
  }
}

export type DiscoverActions = UpdatePopularMoviesAction | UpdateTrendingMoviesAction

