export interface Movie {
  id: string,
  title: string,
  description: string,
  posterUrl: string,
  releaseDate: Date,
  voteAverage: number
}

export interface RawDiscoverMovie {
  id: string,
  title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  vote_average: number
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
