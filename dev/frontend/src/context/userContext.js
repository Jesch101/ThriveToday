import { createContext } from "react";

const UserContext = createContext({
  userInfoContext: null,
  setUserInfoContext: () => {},
});

export default UserContext;
