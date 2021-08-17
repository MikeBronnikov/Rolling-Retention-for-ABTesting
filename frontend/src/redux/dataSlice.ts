import { dataAPI } from '../api/data';
import { dataSendingObj, LiveTime } from './../Types';

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
      data: null as null | {result: number,liveTime: LiveTime } 
    },
    reducers: {
      setData: (state, action: PayloadAction<any>) => { 
        state.data = action.payload;
      },
    },
  });
  
  export const getDataThunk = createAsyncThunk(
    "fetchData",
    async (params,  { dispatch }) => {
      try {
        console.log('in thunk')
        const response = await dataAPI.getData()
        console.log('thunk!!!!')
        console.log(response)
          dispatch(setData(response));
        
      } catch (error) {
        console.error(error)
      }
    }
  )

  export const sendDataThunk = createAsyncThunk(
    "sendData",
    async (item: dataSendingObj[],  { dispatch }) => {
      try {
        console.log('in send thunk')
        console.log(item)
        const response = await dataAPI.sendData(item)
        // console.log('thunk!!!!')
        console.log(response)
        //   dispatch(setData(response));
        
      } catch (error) {
        console.error(error)
      }
    }
  )
  // Action creators are generated for each case reducer function
  export const { setData } = dataSlice.actions;
  
  export default dataSlice.reducer;
  