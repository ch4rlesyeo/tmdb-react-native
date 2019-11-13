import React, { useState, useEffect } from 'react'
import { View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'
import { searchPersonById } from '@utils/queries/people'
import { Person } from '@models/people'
import { Container, Text, Loader } from '@components/native'
import moment from 'moment'

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

  if (loading) {
    return (
      <Container>
        <Loader fullPage />
      </Container>
    )
  }

  const imageWidth = Dimensions.get('screen').width * 0.35
  const imageHeight = Dimensions.get('screen').height * 0.35

  return (
    <Container onBack={() => goBack(null)}>
      <ScrollView>
        <View style={{ flexDirection: 'row', padding: 10, paddingTop: 5 }}>
          <View style={{ width: imageWidth, height: imageHeight }}>
            <Image source={{ uri: person.profileUrl }} style={{ width: '100%', height: '100%' }} />
          </View>
          <View style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
            <View style={{ paddingBottom: 20, flexWrap: 'wrap' }}>
              <Text type='semibold' size={21}>{person.name}</Text>
            </View>
            <View style={{ paddingBottom: 20 }}>
              <Text size={15}>Born :</Text>
              <Text size={15} color='light'>{moment(person.birthday).format('YYYY-MM-DD')}</Text>
            </View>
            <View style={{ paddingBottom: 20 }}>
              <Text size={15}>Place of birth :</Text>
              <Text size={15} color='light'>{person.placeOfBirth}</Text>
            </View>
            <View>
              <Text size={15}>Gender :</Text>
              <Text size={15} color='light'>{person.gender}</Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ paddingBottom: 5 }}>
            <Text size={15}>Biography :</Text>
          </View>
          <Text size={15} color='light' numberOfLines={10}>{person.biography}</Text>
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ paddingBottom: 5 }}>
            <Text size={15}>Also known for :</Text>
          </View>
          <ScrollView horizontal>
            {person.alsoCast.map((c, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginRight: 10, width: imageWidth }}
                activeOpacity={0.6}
                onPress={() => navigate(Screens.View.MovieViewScreen, { movie: c })}
              >
                <Image source={{ uri: c.posterUrl }} style={{ width: imageWidth, height: imageHeight }} />
                <View style={{ paddingTop: 5 }}>
                  <Text center>{c.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Container>
  )
}

export default ViewPeopleScreen
