import moment from 'moment'
import { apiUrl, apiKey } from 'react-native-dotenv'

import { Movie, RawDiscoverMovie, RawTrendingMovie } from '@models/movie'

interface GetPopularMoviesResponse {
  discoverMovies?: Movie[],
  error?: any
}

export const getPopularMovies = async (): Promise<GetPopularMoviesResponse> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      const apiResp = await resp.json()

      if (apiResp && apiResp.results) {
        const movies: Movie[] = apiResp.results.map((r: RawDiscoverMovie) => {
          const movie: Movie = {
            id: r.id,
            title: r.title,
            description: r.overview,
            posterUrl: `http://image.tmdb.org/t/p/w500${r.poster_path}`,
            releaseDate: moment(r.release_date).toDate(),
            voteAverage: r.vote_average
          }

          return movie
        })

        resolve({
          discoverMovies: movies
        })
      } else {
        resolve({
          error: 'Whoops, something went wrong.'
        })
      }
    }).catch((error) => {
      resolve({
        error
      })
    })
  })
}

interface GetTrendingMoviesResponse {
  trendingMovies?: Movie[],
  error?: any
}

export const getTrendingMovies = async (): Promise<GetTrendingMoviesResponse> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/trending/movie/week?api_key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      const apiResp = await resp.json()

      if (apiResp && apiResp.results) {
        const movies: Movie[] = apiResp.results.map((r: RawTrendingMovie) => {
          const movie: Movie = {
            id: r.id,
            title: r.title,
            description: r.overview,
            posterUrl: `http://image.tmdb.org/t/p/w500${r.poster_path}`,
            releaseDate: moment(r.release_date).toDate(),
            voteAverage: r.vote_average
          }

          return movie
        })
        resolve({
          trendingMovies: movies
        })
      } else {
        resolve({
          error: 'Whoops, something went wrong.'
        })
      }
    }).catch((error) => {
      resolve({
        error
      })
    })
  })
}
