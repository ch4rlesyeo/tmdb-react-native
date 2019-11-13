import { Movie } from './movie'

export interface Cast {
  id: string,
  name: string,
  order: number,
  posterUrl?: string
  profileUrl: string,
  characterName: string
}

export interface RawCast {
  id: string,
  name: string,
  order: number,
  profile_path: string,
  poster_path?: string,
  character: string
}

export interface Person {
  id: string,
  name: string,
  gender: 'Male' | 'Female',
  biography: string,
  birthday: Date,
  profileUrl: string,
  placeOfBirth: string,
  knownFor: string,
  alsoCast?: Movie[]
}

export interface RawPerson {
  id: string,
  name: string,
  gender: number,
  biography: string,
  birthday: string,
  profile_path: string,
  place_of_birth: string,
  known_for_department: string
}
