import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'
import { searchPersonById } from '@utils/queries/people'
import { Person } from '@models/people'
import { Container, Text, Loader } from '@components/native'
import { ProfileOverview, ProfileOverviewDetails, OverviewDetailsItem, ProfileSection, ProfileSectionName, KnownMovieName } from './Styled'

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
        <ProfileOverview>
          <View style={{ width: imageWidth, height: imageHeight }}>
            <Image source={{ uri: person.profileUrl }} style={{ width: '100%', height: '100%' }} />
          </View>
          <ProfileOverviewDetails>
            <OverviewDetailsItem>
              <Text type='semibold' size={21}>{person.name}</Text>
            </OverviewDetailsItem>
            <OverviewDetailsItem>
              <Text size={15}>Born :</Text>
              <Text size={15} color='light'>{moment(person.birthday).format('YYYY-MM-DD')}</Text>
            </OverviewDetailsItem>
            <OverviewDetailsItem>
              <Text size={15}>Place of birth :</Text>
              <Text size={15} color='light'>{person.placeOfBirth}</Text>
            </OverviewDetailsItem>
            <OverviewDetailsItem>
              <Text size={15}>Gender :</Text>
              <Text size={15} color='light'>{person.gender}</Text>
            </OverviewDetailsItem>
          </ProfileOverviewDetails>
        </ProfileOverview>
        <ProfileSection>
          <ProfileSectionName>
            <Text size={15}>Biography :</Text>
          </ProfileSectionName>
          <Text size={15} color='light' numberOfLines={10}>{person.biography}</Text>
        </ProfileSection>
        <ProfileSection>
          <ProfileSectionName>
            <Text size={15}>Also known for :</Text>
          </ProfileSectionName>
          <ScrollView horizontal>
            {person.alsoCast.map((c, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginRight: 10, width: imageWidth }}
                activeOpacity={0.6}
                onPress={() => navigate(Screens.View.MovieViewScreen, { movie: c })}
              >
                <Image source={{ uri: c.posterUrl }} style={{ width: imageWidth, height: imageHeight }} />
                <KnownMovieName>
                  <Text center>{c.title}</Text>
                </KnownMovieName>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ProfileSection>
      </ScrollView>
    </Container>
  )
}

export default ViewPeopleScreen
