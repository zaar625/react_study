import { handleActions } from "redux-actions";
import * as api from '../lib/api';

// action타입 설정
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

//thunk 함수를 생성한다.
//thunk 함수 내부에서는 시작할때, 성공했을때, 실패했을때 다른 액션을 디스패치 한다.

export const getPost = id => async dispatch => {
    dispatch({type: GET_POST});//요청시작 알림
    try {
        const response = await api.getPost(id);
        dispatch({
            type:GET_POST_SUCCESS,
            payload: response.data
        });// 요청 성공
    } catch (e) {
        dispatch({
            type: GET_POST_FAILURE,
            payload:e,
            error: true
        });//에러발생
        throw e; //나중에 컴포넌트단에서 에러를조회할 수 있게 해줌. 
    }
};

export const getUsers = () => async dispatch => {
    dispatch({type: GET_USERS});
    
    try{
        const reponse = await api.getUsers();
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: reponse.data
        });//요청성공
    } catch (e) {
        dispatch({
            type:GET_USERS_FAILURE,
            payload: e,
            error:true
        });//에러 발생
        throw e; //나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌 
    }
};

//초기상태 선언
//요청의 로딩 중 상태는 loading이라는 객체에서 관리.

const initialState = {
    loading: {
        GET_POST : false,
        GET_USERS : false
    },
    post: null,
    users: null
};

const sample = handleActions({
    [GET_POST] : state => ({
        ...state,
        loading:{
            ...state.loading,
            GET_POST :true //요청시작
        }
    }),
    [GET_POST_SUCCESS]:(state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_POST: false//요청완료
        },
        post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_POST: false
        }
    }),
    [GET_USERS]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_USERS: false
        },
        users: action.payload
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_USERS_FAILURE: false
        }
    })
},initialState)

export default sample;