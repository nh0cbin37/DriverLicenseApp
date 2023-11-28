import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Exam, Learning, Setting, User, Main_App, RawSearch, Question, Login, TrafficSign, FailQuestion } from "../screens/indexScreens";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { resetState, saveQuestion, saveTimeExam, setVisiable } from '../redux/QuestionsReducer';
import ExamQues, { indexExamsTime, timess } from "../components/ExamQues";
import CustomHeaderExam from "../components/CustomeHeaderExam";
import { getFocusedRouteNameFromRoute, useNavigation } from "@react-navigation/native";
import Done from "../components/Done";
import CustomHeaderResult from "../components/CustomeHeaderResult";



const Stack = createNativeStackNavigator();

const tab = createBottomTabNavigator();


const CustomTabBarButton = ({ children, onPress }) =>
(
    <TouchableOpacity
        style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
            ...style.shadow
        }}
        onPress={onPress}>

        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={110}
            height={60}
            fill="none"
            viewBox="0 0 110 60"
            style={{ position: 'absolute', top: 17 }}
        >
            <Path
                fill="#f5f5f5"
                d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
            />
        </Svg>

        <View style={{
            width: 60,
            height: 60,
            borderRadius: 35,
            top: 20,
            left: 2,
            bottom: 1
        }}>
            {children}
        </View>

    </TouchableOpacity>
);

const CustomHeader = () => (
    <Image
        source={require('../assets/background.png')}
        style={{ width: '100%', height: '46%' }}
    >
    </Image>
)

const Tab = ({ navigation }) => {
    const dispatch = useDispatch();
    const typeQuestion = useSelector(state => state.questions.typeQuestion);

    const HomeScreen = ({ navigation, route }) => {

        return (

            <tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {

                        position: 'absolute',
                        bottom: 20,
                        left: 10,
                        right: 10,
                        elevation: 0,
                        borderRadius: 15,
                        backgroundColor: 'white',
                        height: 60,
                        ...style.shadow,

                    },
                }} >
                <tab.Screen name="Exam"
                    component={Exam}
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#1E90FF' },
                        headerTitle: 'Thi sát hạch',
                        headerTitleStyle: { justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' },
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                                <Image
                                    source={require('../assets/exam.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? '#1E90FF' : '#748c94',
                                    }} />
                                <Text style={{ fontSize: 10, color: focused ? '#1E90FF' : '#748c94', fontWeight: 'bold' }}>EXAM</Text>
                            </View>
                        )
                    }} />
                <tab.Screen name="Learning" component={Learning} options={{
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#1E90FF' },
                    headerTitle: 'Học lý thuyết',
                    headerTitleStyle: { justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' },
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => dispatch(resetState({ target: ["importantQuestion", "ruleQuestion"] }))} >
                                <Ionicons name="reload-outline" size={24} style={{ marginRight: '10%' }} />
                            </TouchableOpacity>
                        )
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                            <Image
                                source={require('../assets/homework.png')}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? '#1E90FF' : '#748c94',

                                }}
                            // onPress={() => {indexExamsTime===-1? dispatch(saveTimeExam({target:'TimeExam',value:Time,index:0})):dispatch(saveTimeExam({target:'TimeExam',value:timess,index:indexExamsTime})),console.log(1)
                            // }}
                            />
                            <Text style={{ fontSize: 10, color: focused ? '#1E90FF' : '#748c94', fontWeight: 'bold' }}>LEARN</Text>
                        </View>
                    )
                }} />

                <tab.Screen name="Home" component={Main_App}
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#1E90FF' },
                        headerTitle: 'Ôn thi giấy phép lái xe',
                        headerTitleStyle: { justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' },
                        tabBarIcon: ({ focused }) => (

                            <Image style={{
                                width: 115,
                                height: 115,
                            }}
                                resizeMode="cover"
                                source={require("../assets/Logo.png")} />

                        ),
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        )
                    }} />

                <tab.Screen name="User" component={User} options={{

                    headerTitleStyle: { color: "#fff" },
                    //  
                    header: CustomHeader,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                            <Image
                                source={require('../assets/Users.png')}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? '#1E90FF' : '#748c94',

                                }}
                            />
                            <Text style={{ fontSize: 10, color: focused ? '#1E90FF' : '#748c94', fontWeight: 'bold' }}>USER</Text>
                        </View>
                    )
                }} />

                <tab.Screen name="Setting" component={Setting} options={{
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#1E90FF' },
                    headerTitle: 'Cài đặt ứng dụng',
                    headerTitleStyle: { justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' },
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                            <Image
                                source={require('../assets/settings.png')}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? '#1E90FF' : '#748c94',

                                }}
                            />
                            <Text style={{ fontSize: 10, color: focused ? '#1E90FF' : '#748c94', fontWeight: 'bold' }}>SETTING</Text>
                        </View>
                    )
                }} />

                <tab.Screen name="TrafficSign" component={TrafficSign} options={{
                    headerShown: false,
                    tabBarButton: () => null,
                }} />
                <tab.Screen name="FailQuestion" component={FailQuestion} options={{
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#1E90FF' },
                    headerTitle: 'Câu hỏi hay sai',
                    headerTitleStyle: { justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' },
                    tabBarButton: () => null,
                }} />

            </tab.Navigator>

        )
    }

    return (

        <Stack.Navigator initialRouteName='Main_App' >
            <Stack.Screen name='Main_App' component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name='Learning' component={HomeScreen} />
            <Stack.Screen name='Question' component={Question}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#1E90FF' },
                    headerTitle: 'Câu hỏi điểm liệt',
                    headerTitleStyle: { justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' },
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => dispatch(setVisiable({ target: typeQuestion }))} >
                                <Ionicons name="albums-outline" size={24} />
                            </TouchableOpacity>)
                    }
                }}
            />
            <Stack.Screen name='ExamQues' component={ExamQues}
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => dispatch(setVisiable({ target: 'Exam' }))} >
                                <Ionicons name="albums-outline" size={24} />
                            </TouchableOpacity>)
                    },
                    header: () => <CustomHeaderExam name={'Exam'} title={'Đề thi'} navigation={navigation} />,
                }}
            />
            <Stack.Screen name='Exam' component={HomeScreen} />
            <Stack.Screen name='Done' component={Done}
                options={{
                    //   headerTitleAlign: 'center',
                    //   headerStyle: { backgroundColor: '#1E90FF' },
                    //   headerTitle: 'Kết quả',
                    //   headerTitleStyle: { justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' },
                    header: () => <CustomHeaderResult />,
                }} />
            <Stack.Screen name='TrafficSign' component={HomeScreen} />
            <Stack.Screen name='FailQuestion' component={HomeScreen}

            />
        </Stack.Navigator>
    )

}

const style = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,

    },
    actionBtn: {

        backgroundColor: '#1E90FF',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'


    }
})
export default Tab;
