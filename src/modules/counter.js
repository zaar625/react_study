import { createAction, handleActions } from "redux-actions";

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DEREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// Thunk생성 함수 만들기
export const increaseAsync = () => dispatch => {
    setTimeout(() => {
       dispatch(increase()); 
    },1000);
};
export const decreaseAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(decrease());
    }, 1000);
}
const initialState = 0;

const counter = handleActions({
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1
},initialState)

export default counter;