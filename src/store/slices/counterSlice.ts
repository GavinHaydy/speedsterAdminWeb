import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Dispatch } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    reset: (state) => {
      state.value = 0;
      state.status = 'idle';
    },
    setStatus: (state, action: PayloadAction<CounterState['status']>) => {
      state.status = action.payload;
    },
  },
});

// 导出 actions
export const { increment, decrement, incrementByAmount, decrementByAmount, reset, setStatus } =
  counterSlice.actions;

// 导出 selectors
export const selectCount = (state: { counter: CounterState }) => state.counter.value;
export const selectStatus = (state: { counter: CounterState }) => state.counter.status;

// 异步 action 示例
export const incrementAsync = (amount: number) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export default counterSlice.reducer;
