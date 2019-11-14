import React from 'react'
import moment from 'moment'
import { View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'

import { Movie } from '@models/movie'
import { Person } from '@models/people'
import { Text, Loader, Empty } from '@components/native'
import { Profile, Section, KnownMovieName } from './Styled'

interface Props {
  loading: boolean,
  person?: Person,
  onSelect: (movie: Movie) => void
}

export default (props: Props) => {
  const { loading, person, onSelect } = props

  if (loading) {
    return (
      <Loader fullPage />
    )
  }

  if (!person) {
    return (
      <Empty
        title='Whoops, something went wrong'
        description='Unable to display at the moment, please try again later.'
      />
    )
  }

  const imageWidth = Dimensions.get('screen').width * 0.35
  const imageHeight = Dimensions.get('screen').height * 0.35

  return (
    <ScrollView>
      <Profile.Overview>
        <View style={{ width: imageWidth, height: imageHeight }}>
          <Image source={{ uri: person.profileUrl }} style={{ width: '100%', height: '100%' }} />
        </View>
        <Profile.Info>
          <Profile.InfoItem>
            <Text type='semibold' size={21}>{person.name}</Text>
          </Profile.InfoItem>
          <Profile.InfoItem>
            <Text size={15}>Born :</Text>
            <Text size={15} color='light'>{moment(person.birthday).format('YYYY-MM-DD')}</Text>
          </Profile.InfoItem>
          <Profile.InfoItem>
            <Text size={15}>Place of birth :</Text>
            <Text size={15} color='light'>{person.placeOfBirth}</Text>
          </Profile.InfoItem>
          <Profile.InfoItem>
            <Text size={15}>Gender :</Text>
            <Text size={15} color='light'>{person.gender}</Text>
          </Profile.InfoItem>
        </Profile.Info>
      </Profile.Overview>
      <Section.Container>
        <Section.Name>
          <Text size={15}>Biography :</Text>
        </Section.Name>
        <Text size={15} color='light' numberOfLines={10}>{person.biography}</Text>
      </Section.Container>
      <Section.Container>
        <Section.Name>
          <Text size={15}>Also known for :</Text>
        </Section.Name>
        <ScrollView horizontal>
          {person.alsoCast.map((m, index) => (
            <TouchableOpacity
              key={index}
              style={{ marginRight: 10, width: imageWidth }}
              activeOpacity={0.6}
              onPress={() => onSelect(m)}
            >
              <Image source={{ uri: m.posterUrl }} style={{ width: imageWidth, height: imageHeight }} />
              <KnownMovieName>
                <Text center>{m.title}</Text>
              </KnownMovieName>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Section.Container>
    </ScrollView>
  )
}
