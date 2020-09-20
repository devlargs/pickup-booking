import { configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth";
import booking from "./reducers/booking";

export default configureStore({
  reducer: {
    auth,
    booking,
  },
});
