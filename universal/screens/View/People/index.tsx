import React, { useState, useEffect } from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'
import { searchPersonById } from '@utils/queries/people'
import { Person } from '@models/people'
import { Container } from '@components/native'
import PersonView from './View'

interface State {
  person?: Person,
  loading: boolean
}

const ViewPeopleScreen = () => {
  const { state, navigate, goBack } = useNavigation()

  const peopleId = state.params.people.id

  const [viewState, updateViewState] = useState<State>({
    loading: true,
    person: undefined
  })

  const { loading, person } = viewState

  useEffect(() => {
    const fetch = async () => {
      updateViewState({ ...viewState, loading: true })

      const { person } = await searchPersonById(peopleId)

      updateViewState({ ...viewState, loading: false, person })
    }

    fetch()
  }, [peopleId])

  return (
    <Container onBack={() => goBack(null)}>
      <PersonView
        loading={loading}
        person={person}
        onSelect={(movie) => navigate(Screens.View.MovieViewScreen, { movie })}
      />
    </Container>
  )
}

export default ViewPeopleScreen
