import { Cast } from './people'

export interface Movie {
  id: string,
  title: string,
  casts?: Cast[],
  description: string,
  posterUrl: string,
  releaseDate: Date,
  voteAverage: number,
  duration?: number
}

export interface RawMovie {
  id: string,
  title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  runtime: number
}

export interface RawTrendingMovie {
  id: string,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  release_date: string,
  vote_average: number
}
