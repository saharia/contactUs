import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';


export const saveContact = createAsyncThunk(
  'contactUsApp/contact/save',
  async (_data, { getState, dispatch }) => {

    const formData = new FormData();
    const params = [ 'name', 'email', 'file', 'message' ];
    for(let param of params) {
      formData.append(param, _data[param]);
    }
    try {
      
      const response = await axios.post(`/api/contact-us`, formData, { headers: { 'content-type': 'multipart/form-data' } } );
  
      const data = await response.data;
  
      dispatch(showMessage({ message: 'Contact Saved' }));
      
      return data;
    } catch (error) {
      return { errors: error.response.data };
    }
  }
);

const contactUsSlice = createSlice({
  name: 'contactUsApp/contact',
  initialState: null,
  reducers: {},
  extraReducers: {
    [saveContact.fulfilled]: (state, action) => action.payload,
  },
});


export default contactUsSlice.reducer;
