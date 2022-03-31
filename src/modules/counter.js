import { createAction, handleActions } from "redux-actions";
import {delay, put, takeEvery, takeLatest} from 'redux-saga/effects'

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DEREASE';
// redux-saga
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';


export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//redux-saga
export const increaseAsync = createAction(INCREASE_ASYNC, ()=> undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, ()=> undefined);



// // Thunk생성 함수 만들기
// export const increaseAsync = () => dispatch => {
//     setTimeout(() => {
//        dispatch(increase()); 
//     },1000);
// };
// export const decreaseAsync = () => dispatch => {
//     setTimeout(() => {
//         dispatch(decrease());
//     }, 1000);
// }

function* increaseSaga(){
    yield delay(1000);//1초 기다리기
    yield put(increase()); //특정 액션을 디스패치 하기
}

function* decreaseSaga(){
    yield delay(1000);//1초 기다리기
    yield put(decrease()); //특정 액션을 디스패치 하기
}

export function* counterSaga(){
    yield takeEvery(INCREASE_ASYNC, increaseSaga);
    yield takeLatest(DECREASE_ASYNC,decreaseSaga);
}

const initialState = 0;

const counter = handleActions({
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1
},initialState)

export default counter;