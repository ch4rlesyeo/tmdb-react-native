import moment from 'moment'
import { apiUrl, apiKey } from 'react-native-dotenv'

import { RawMovie, Movie } from '@models/movie'
import { Cast, RawCast, Person, RawPerson } from '@models/people'

interface SearchCreditsByMovieIdResponse {
  casts?: Cast[],
  error?: any
}

export const searchCreditsByMovieId = (movieId: string): Promise<SearchCreditsByMovieIdResponse> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/movie/${movieId}/credits?api_key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      const apiResp = await resp.json()

      if (apiResp && apiResp.cast) {
        const rawCasts: RawCast[] = apiResp.cast

        const casts: Cast[] = rawCasts.map((r) => {
          const cast: Cast = {
            id: r.id,
            name: r.name,
            order: r.order,
            profileUrl: `http://image.tmdb.org/t/p/w342${r.profile_path}`,
            characterName: r.character
          }

          return cast
        })

        resolve({
          casts
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

interface SearchPersonMovieCreditsResponse {
  movies?: Movie[],
  error?: any
}

export const searchPersonMoviesByName = (peopleName: string): Promise<SearchPersonMovieCreditsResponse> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/search/person?api_key=${apiKey}&query=${peopleName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      const apiResp = await resp.json()

      if (apiResp && apiResp.results) {
        const movies: Movie[] = []

        apiResp.results.forEach((r) => {
          const rawMovies: RawMovie[] = r.known_for

          rawMovies.forEach((rm) => {
            movies.push({
              id: rm.id,
              title: rm.title,
              description: rm.overview,
              posterUrl: `http://image.tmdb.org/t/p/w342${rm.poster_path}`,
              releaseDate: moment(rm.release_date).toDate(),
              voteAverage: rm.vote_average
            })
          })
        })

        resolve({
          movies
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

interface SearchPersonByIdResponse {
  person?: Person,
  error?: any
}

export const searchPersonById = (peopleId: string): Promise<SearchPersonByIdResponse> => {
  return new Promise((resolve) => {
    fetch(`${apiUrl}/person/${peopleId}?api_key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      const apiResp = await resp.json()

      if (apiResp) {
        const r: RawPerson = apiResp

        const { movies } = await searchPersonMoviesByName(r.name)

        const person: Person = {
          id: r.id,
          name: r.name,
          gender: r.gender === 1 ? 'Female' : 'Male',
          knownFor: r.known_for_department,
          alsoCast: movies,
          biography: r.biography,
          birthday: moment(r.birthday).toDate(),
          profileUrl: `http://image.tmdb.org/t/p/w500${r.profile_path}`,
          placeOfBirth: r.place_of_birth
        }

        resolve({
          person
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
