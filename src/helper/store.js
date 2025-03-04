// import { configureStore } from "@reduxjs/toolkit";
// import productReducer from './productSlice'
// export const store = configureStore ({
// reducer: {

//     products:productReducer
// }

// })




import { configureStore } from "@reduxjs/toolkit";
import fileSystemReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    fileSystem: fileSystemReducer
  }
});
