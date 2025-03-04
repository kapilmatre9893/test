import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';





export const getlist = createAsyncThunk("get_list", async () => {
    return await fetch( "https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("access_token"),
      },
    }).then((res) => {
      return res.json();
    });
  });
  
  export const Adddata  = createAsyncThunk("adduser", async (values) => {
    return await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(values),
    }).then((res) => {
      return res.json();
    });
  });




  export const deletelist = createAsyncThunk('delete_list', async (delete_list) => {
    const requestOptions = {
        delete_list: `${delete_list}`
    };
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${delete_list}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem("access_token"),
      },
      body: JSON.stringify()
  
    }).then(res => {
      return res.json()
    });
  })
  


  export const viewlist = createAsyncThunk('view_list', async (view_list) => {
    const requestOptions = {
        view_list: `${view_list}`
    };
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${view_list}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem("access_token"),
      },
      body: JSON.stringify()
  
    }).then(res => {
      return res.json()
    });
  })




  export const Editlist = createAsyncThunk('Edit_list', async (Edit_list) => {
    const requestOptions = {
        Edit_list: `${Edit_list}`
    };
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${Edit_list}`, {
      method: 'Put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem("access_token"),
      },
      body: JSON.stringify()
  
    }).then(res => {
      return res.json()
    });
  })



  


const productSlice = createSlice ({
    name : 'products',
    initialState:{
        items:[],
        loading :false,
        error:null 
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getlist.pending, (state) => {
            state.loading = true;
          })
          .addCase(getlist.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
          })
          .addCase(getlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(Adddata.fulfilled, (state, action) => {
            state.posts.unshift(action.payload); // Add new post at the top
          });
      },
    });



export default  productSlice.reducers;