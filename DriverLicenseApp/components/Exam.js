import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Animated, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Surface, Text } from 'react-native-paper'
import { DarkTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { setIndex, setStyles, moveToNextQuestion, moveToPreviousQuestion, setData, setDataExam, setStylesExam, resetExamFailed } from '../redux/QuestionsReducer';
import _ from 'lodash';
import { cnt } from './ExamQues'
export let cntEx = -1;

const Exam = ({ navigation }) => {
  var ArrEx = [];
  const [countEx, SetContEx] = useState(3);
  cntEx = countEx;
  const questionsExam = useSelector(state => state.questions.Exam.data);
  const question = useSelector(state => state.questions.importantQuestion.data);
  const Time = useSelector(state => state.questions.TimeExam.data);
  const Done = useSelector(state => state.questions.TimeExam.Done);
  const Result = useSelector(state => state.questions.TimeExam.Result);
  const countExam = useSelector(state => state.questions.TimeExam.countExam[0]);
  const indexsExam = useSelector(state => state.questions.Exam.index[0]);



  const getRandomItems = (data, count) => {
    const shuffledData = _.shuffle(data);
    return shuffledData.slice(0, count);
  };
  const Ex = ({ count }) => {
    const dispatch = useDispatch();

    for (let index = 0; index < countEx; index++) {
      // splittedString = Time[index].split(':');
      const importantQuestions =
        question && question.length > 0
          ? question.filter(item => item.typequestion === 'important')
          : [];
      const RuleQuestions =
        question && question.length > 0
          ? question.filter(item => item.typequestion === 'rule')
          : [];

      const ImportantQues = getRandomItems(importantQuestions, 18);
      const RuleQues = getRandomItems(RuleQuestions, 2);
      let ExamMixed = [];
      ExamMixed.push(...RuleQues, ...ImportantQues);
      ExamMixed = getRandomItems(ExamMixed, 20)




      if (questionsExam[index] && questionsExam[index].length > 0) {
        null
      }
      else {
        dispatch(setData({ target: 'ExamQuestion', value: ExamMixed }))
        // dispatch(setDataForMenuOptions({ target: 'Styles',index:index }))      
      }


      ArrEx.push(
        <Surface key={index} style={styles.surfaceUser} theme={DarkTheme} >
          {/* //set backgroud image */}
          {
            Time[index] === '19:00' ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: '#1E90FF', borderRadius: 8 }}>
                <Image source={require('../assets/exam(1).png')} style={{ width: 30, height: 30 }} />
              </View> :
              Done[index] === -1 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: 'yellow', borderRadius: 8 }}>
                  <Image source={require('../assets/clock.png')} style={{ width: 30, height: 30 }} />
                </View> : Result[index] < 10 ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: 'red', borderRadius: 8 }}>
                    <Image source={require('../assets/remove.png')} style={{ width: 30, height: 30, }} />
                  </View> :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40, height: 50, backgroundColor: '#7CFC00', borderRadius: 8 }}>
                    <Image source={require('../assets/correct.png')} style={{ width: 30, height: 30 }} />
                  </View>
          }

          {/* //set value của Đề,Time */}
          <View style={Time[index] === '19:00' ? styles.ViewPercent : styles.ViewPercent1}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đề số {index + 1}</Text>
            <Text style={{ fontSize: 15 }}>{Time[index] === '19:00' ? "25 Câu/19 phút" : Done[index] === -1 ? "Còn " + Time[index] : Result[index] < 10 ? "Trượt " + Result[index] + "/20" : "Qua " + Result[index] + "/20"}</Text>
          </View>

          {/* //set xử lý btn làm bài*/}
          {Done[index] === -1 ?
            <TouchableOpacity style={Time[index] === '19:00' ? styles.ButtonEx : styles.ButtonEx1} onPress={() => navigation.navigate('ExamQues', {
              index: index,
            })}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>{Time[index] === '19:00' ? "Làm bài" : "Tiếp"}</Text>
            </TouchableOpacity> :
            Result[index] < 10 ?
              <TouchableOpacity style={Time[index] === '19:00' ? styles.ButtonEx : styles.ButtonEx1} onPress={() => {
                Time[index] === '19:00' ? navigation.navigate('ExamQues', {
                  index: index,
                }) :
                  (dispatch(resetExamFailed({ target: 'TimeExam', index: index })), navigation.navigate('ExamQues', {
                    index: index,
                  }))
              }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>Làm lại</Text>
              </TouchableOpacity> :
              <View style={Time[index] === '19:00' ? styles.ButtonEx : styles.ButtonEx1}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', alignSelf: 'center' }}>Tốt</Text>
              </View>}
        </Surface>
      )
    }



    return (
      <View>
        {ArrEx}
      </View>
    )
  }

  //animated button them
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    SetContEx(countEx + 1)
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  return (
    <SafeAreaProvider>

      <ScrollView style={styles.container}>
        <View style={styles.viewEx}>
          <Ex />

        </View>

      </ScrollView>
      {/* <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
            /> */}

      <View style={{
        bottom: '10%',
        left: "2%"
      }}>
        <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
          <TouchableOpacity>
            <Icon name="cloud-upload" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2 }]}>
          <TouchableOpacity>
            <Icon name="print" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.circle, { right: icon_3 }]}>
          <TouchableOpacity>
            <Icon name="share-alt" size={25} color="#FFFF" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => {
            pop === false ? popIn() : popOut();
          }}
        >
          <Icon name="plus" size={25} color="#FFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>


  )
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 80,
  },
  viewEx:
  {
    flex: 1,

  },
  surfaceUser:
  {
    flexDirection: 'row',
    padding: "1%",
    elevation: 6,
    borderRadius: 15,
    backgroundColor: "white",
    margin: "2%"
  },
  ButtonEx:
  {
    backgroundColor: '#CCFFFF',
    alignSelf: 'center',
    borderRadius: 8,
    marginLeft: '40%',
    right: '20%',
    width: 60,
    height: 25
  },
  ButtonEx1:
  {
    backgroundColor: '#CCFFFF',
    alignSelf: 'center',
    borderRadius: 8,
    marginLeft: '50%',
    right: '20%',
    width: 55,
    height: 25
  },

  circle: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewPercent:
  {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: "30%"
  },
  ViewPercent1:
  {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: "70%"
  },
})

export default Exam 