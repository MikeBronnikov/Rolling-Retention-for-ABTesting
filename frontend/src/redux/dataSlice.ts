import { dataAPI } from '../api/data';
import { dataSendingObj, LiveTime } from './../Types';

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
      data: null as null | {result: number,liveTime: LiveTime },
      fetchingList: [] as Array<'saving' | 'calculating'>
    },
    reducers: {
      setData: (state, action: PayloadAction<any>) => { 
        state.data = action.payload;
      },
      setFetching: (state, action: PayloadAction<'saving' | 'calculating'>) => { 
        state.fetchingList = [...state.fetchingList, action.payload];
      },
      deleteFetching: (state, action: PayloadAction<'saving' | 'calculating'>) => { 
        state.fetchingList = state.fetchingList.filter(elem => elem !== action.payload);
      },
    },
  });
  
  export const getDataThunk = createAsyncThunk(
    "fetchData",
    async (params,  { dispatch }) => {
      try {
        dispatch(setFetching('calculating'))
        const response = await dataAPI.getData()
        dispatch(setData(response));
        dispatch(deleteFetching('calculating'))
        
      } catch (error) {
        console.error(error)
      }
    }
  )

  export const sendDataThunk = createAsyncThunk(
    "sendData",
    async (item: dataSendingObj[],  { dispatch }) => {
      try {
        dispatch(setFetching('saving'))
        const response = await dataAPI.sendData(item)
        dispatch(deleteFetching('saving'))
      } catch (error) {
        console.error(error)
      }
    }
  )
  // Action creators are generated for each case reducer function
  export const { setData, setFetching, deleteFetching } = dataSlice.actions;
  
  export default dataSlice.reducer;
  