import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const GET_PROFILE = "GET_PROFILE";
const SET_PROFILE = "SET_PROFILE";
const MODIFY_PROFILE = "MODIFY_PROFILE";

const getProfile = createAction(GET_PROFILE, (profile_info) => ({ profile_info }));
const setProfile = createAction(SET_PROFILE, (user) => ({ user }));
const modifyProfile = createAction(MODIFY_PROFILE, (user) => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

const getprofileDB = (id, pwd) => {

};

const setprofileDB = (id, pwd, user_name) => {

};

const modifyprofileDB = (id, pwd) => {

};

export default handleActions(
  {
    [GET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [SET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [MODIFY_PROFILE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getProfile,
  setProfile,
  modifyProfile,
  getprofileDB,
  setprofileDB,
  modifyprofileDB,
};

export { actionCreators };
