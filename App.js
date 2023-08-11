/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';
import Title from './components/Title/Title';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import style from './assets/styles/main';
import UserStory from './components/UserStory/UserStory';
import UserPost from './components/UserPost/UserPost';

const App = () => {
  const data = [
    {firstName: 'Joseph', id: 1},
    {firstName: 'Angel', id: 2},
    {firstName: 'White', id: 3},
    {firstName: 'Olivier', id: 4},
    {firstName: 'Nate', id: 5},
    {firstName: 'Adam', id: 6},
    {firstName: 'Sean', id: 7},
    {firstName: 'Nicolas', id: 8},
    {firstName: 'Frederic', id: 9},
  ];
  const posts = [
    {
      firstName: 'Allison',
      lastName: 'Becker',
      location: 'Sukabumi, Jawa Barat',
      likes: 1201,
      comments: 24,
      bookmarks: 55,
      id: 1,
    },
    {
      firstName: 'Jennifer',
      lastName: 'Wilkson',
      location: 'Pandok Luengsir, Jawa Barat',
      likes: 570,
      comments: 12,
      bookmarks: 60,
      id: 2,
    },
    {
      firstName: 'Adam',
      lastName: 'Spera',
      location: 'Boston, Massachussetts',
      likes: 100,
      comments: 8,
      bookmarks: 7,
      id: 3,
    },
    {
      firstName: 'Anıl',
      lastName: 'Yavaş',
      location: 'Zonguldak, Turkey',
      likes: 5000,
      comments: 700,
      bookmarks: 44,
      id: 4,
    },
    {
      firstName: 'Nicholas',
      lastName: 'Namoradze',
      location: 'Berlin, Germany',
      likes: 1240,
      comments: 56,
      bookmarks: 20,
      id: 5,
    },
  ];
  const pageSize = 4;
  const pageSizePosts = 2;
  const [pageNumber, setPageNumber] = useState(1);
  const [postPageNumber, setPostPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [renderedData, setRenderedData] = useState(data.slice(0, pageSize));
  const [renderedDataPosts, setRenderedDataPosts] = useState(
    posts.slice(0, pageSizePosts),
  );
  const pagination = (data, pageNumber, pageSize, posts = false) => {
    let startIndex = (pageNumber - 1) * pageSize;
    if (startIndex > data.length) {
      return [];
    }
    if (!posts) {
      setPageNumber(pageNumber);
    } else {
      setPostPageNumber(pageNumber);
    }
    return data.slice(startIndex, startIndex + pageSize);
  };
  return (
    <SafeAreaView>
      <View style={style.userPostContainer}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <>
                <View style={style.header}>
                  <Title title={"Let's Explore"} />
                  <Pressable style={style.messageIcon}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      color={'#CACDDE'}
                      size={20}
                    />
                    <View style={style.messageNumberContainer}>
                      <Text style={style.messageNumber}>2</Text>
                    </View>
                  </Pressable>
                </View>
                <View style={style.userStoryContainer}>
                  <FlatList
                    ListHeaderComponent={() => {
                      return <></>;
                    }}
                    onMomentumScrollBegin={() => setIsLoading(false)}
                    onEndReachedThreshold={0.5}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={() => {
                      if (!isLoading) {
                        setIsLoading(true);
                        setRenderedData(prev => [
                          ...prev,
                          ...pagination(data, pageNumber + 1, pageSize),
                        ]);
                        setIsLoading(false);
                      }
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={renderedData}
                    renderItem={({item}) => (
                      <UserStory firstName={item.firstName} />
                    )}
                  />
                </View>
              </>
            );
          }}
          onMomentumScrollBegin={() => setIsLoadingPosts(false)}
          onEndReachedThreshold={0.5}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            if (!isLoading) {
              setIsLoadingPosts(true);
              setRenderedDataPosts(prev => [
                ...prev,
                ...pagination(posts, postPageNumber + 1, pageSizePosts, true),
              ]);
              setIsLoadingPosts(false);
            }
          }}
          showsVerticalScrollIndicator={false}
          data={renderedDataPosts}
          renderItem={({item}) => (
            <UserPost
              firstName={item.firstName}
              lastName={item.lastName}
              comments={item.comments}
              likes={item.likes}
              bookmarks={item.bookmarks}
              location={item.location}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
