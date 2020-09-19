import { configureStore } from "@reduxjs/toolkit";

import booking from "./reducers/booking";

export default configureStore({
  reducer: {
    booking,
  },
});
