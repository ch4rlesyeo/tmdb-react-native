import React, { useState } from 'react'
import { TouchableOpacity, ScrollView, Image, Dimensions, FlatList } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import { Screens } from '@utils/screens'
import { searchMoviesWithKeyword } from '@utils/queries/movies'
import { Movie } from '@models/movie'
import { TextBox, Text, Container, Loader } from '@components/native'
import { SearchBox, NoResultView } from './Styled'

interface State {
  loading: boolean,
  results?: Movie[]
}

const SearchScreen = () => {
  const { navigate } = useNavigation()

  const imageWidth = Dimensions.get('screen').width / 3.3
  const imageHeight = Dimensions.get('screen').width / 2.3

  const [searchState, updateSearchState] = useState<State>({
    loading: false,
    results: undefined
  })

  const { results, loading } = searchState

  const onSearch = async (keyword: string) => {
    updateSearchState({ ...searchState, loading: true, results: [] })

    const { results } = await searchMoviesWithKeyword(keyword)

    updateSearchState({ ...searchState, loading: false, results })
  }

  const dataSource = results && results.map((r, index) => ({
    key: index,
    ...r
  }))

  return (
    <Container>
      <SearchBox>
        <TextBox onChange={onSearch} />
      </SearchBox>
      {loading ? (
        <Loader fullPage />
      ) : (
        <React.Fragment>
          {(results && results.length === 0) ? (
            <NoResultView>
              <Text size={18}>No results available.</Text>
            </NoResultView>
          ) : (
            <ScrollView>
              <FlatList
                data={dataSource}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.key}
                    style={{ width: imageWidth, height: imageHeight, justifyContent: 'center', alignItems: 'center', margin: 5 }}
                    onPress={() => navigate(Screens.View.MovieViewScreen, { movie: item })}
                  >
                    <Image source={{ uri: item.posterUrl }} style={{ width: imageWidth, height: imageHeight }} />
                  </TouchableOpacity>
                )}
                style={{ flex: 1 }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                numColumns={3}
              />
            </ScrollView>
          )}
        </React.Fragment>
      )}
    </Container>
  )
}

export default SearchScreen
