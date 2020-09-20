import { configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth";
import booking from "./reducers/booking";
import drivers from "./reducers/drivers";

export default configureStore({
  reducer: {
    auth,
    booking,
    drivers,
  },
});
