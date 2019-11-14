import React from 'react'
import moment from 'moment'
import { ScrollView } from 'react-native'
import { shallow } from 'enzyme'

import { Empty, Loader } from '@components/native'
import MovieView from '../View'
import { Cover } from '../Styled'

it('Movie view should not render result or empty while loading', () => {
  const WrapperView = shallow(
    <MovieView loading={true} />
  )

  // Check if loader is showing
  const checkIfLoaderRendered = WrapperView.contains(<Loader fullPage />)

  expect(checkIfLoaderRendered).toBe(true)

  // Check if empty view showing
  const checkIfEmptyViewRendered = WrapperView.contains(
    <Empty
      title='Whoops, something went wrong'
      description='Unable to display at the moment, please try again later.'
    />
  )

  expect(checkIfEmptyViewRendered).toBe(false)

  // check if result rendered
  const checkIfResultRendered = WrapperView.contains(<ScrollView />)

  expect(checkIfResultRendered).toBe(false)
})

it('Movie view should show empty description if result is empty', () => {
  const WrapperView = shallow(
    <MovieView loading={false} movie={undefined} />
  )

  // Check if loader is showing
  const checkIfLoaderRendered = WrapperView.contains(<Loader />)

  expect(checkIfLoaderRendered).toBe(false)

  // check if result rendered
  const checkIfResultRendered = WrapperView.contains(<ScrollView />)

  expect(checkIfResultRendered).toBe(false)

  // Check if empty view showing
  const checkIfEmptyViewRendered = WrapperView.contains(
    <Empty
      title='Whoops, something went wrong'
      description='Unable to display at the moment, please try again later.'
    />
  )

  expect(checkIfEmptyViewRendered).toBe(true)
})

it('Movie view should show result is result is not empty', () => {
  const WrapperView = shallow(
    <MovieView
      loading={false}
      movie={{
        id: '24428',
        title: 'The Avengers',
        duration: 120,
        description: 'When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!',
        posterUrl: '/cezWGskPY5x7GaglTTRN4Fugfb8.jpg',
        releaseDate: moment('2012-04-25').toDate(),
        voteAverage: 7.33
      }}
    />
  )

  // Check if loader is showing
  const checkIfLoaderRendered = WrapperView.contains(<Loader />)

  expect(checkIfLoaderRendered).toBe(false)

  // Check if empty view showing
  const checkIfEmptyViewRendered = WrapperView.contains(
    <Empty
      title='Whoops, something went wrong'
      description='Unable to display at the moment, please try again later.'
    />
  )

  expect(checkIfEmptyViewRendered).toBe(false)

  // check if result rendered
  const checkIfResultRendered = WrapperView.find(Cover.Container).length === 1

  expect(checkIfResultRendered).toBe(true)
})
