import moment from 'moment'
import { apiUrl, apiKey } from 'react-native-dotenv'

import { Movie, RawMovie, RawTrendingMovie } from '@models/movie'
import { searchCreditsByMovieId } from './people'

interface GetPopularMoviesResponse {
  popularMovies?: Movie[],
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
        const movies: Movie[] = apiResp.results.map((r: RawMovie) => {
          const movie: Movie = {
            id: r.id,
            title: r.title,
            description: r.overview,
            posterUrl: `http://image.tmdb.org/t/p/w342${r.poster_path}`,
            releaseDate: moment(r.release_date).toDate(),
            voteAverage: r.vote_average
          }

          return movie
        })

        resolve({
          popularMovies: movies
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
            posterUrl: `http://image.tmdb.org/t/p/w342${r.poster_path}`,
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

interface SearchMoviesWithWordsResponse {
  results?: Movie[],
  error?: any
}

export const searchMoviesWithKeyword = (keyword: string): Promise<SearchMoviesWithWordsResponse> => {
  return new Promise((resolve) => {
    if (!keyword || keyword === '') {
      resolve({
        results: undefined
      })
    }

    fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      const apiResp = await resp.json()

      if (apiResp && apiResp.results) {
        const movies: Movie[] = apiResp.results.map((r: RawMovie) => {
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
          results: movies
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

interface SearchMovieByIdResponse {
  result?: Movie,
  error?: any
}

export const searchMovieById = (movieId: string): Promise<SearchMovieByIdResponse> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      const apiResp = await resp.json()

      if (apiResp) {
        const r: RawMovie = apiResp

        const { casts } = await searchCreditsByMovieId(r.id)

        const movie: Movie = {
          id: r.id,
          title: r.title,
          casts: casts && [...casts],
          duration: r.runtime,
          description: r.overview,
          posterUrl: `http://image.tmdb.org/t/p/w500${r.poster_path}`,
          releaseDate: moment(r.release_date).toDate(),
          voteAverage: r.vote_average
        }

        resolve({
          result: movie
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
