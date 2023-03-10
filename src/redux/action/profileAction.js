import { TYPES, DeleteData } from "./notifyAction";
import { getData, patchData } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({
          type: PROFILE_TYPES.LOADING,
          payload: true,
        });
        const res = await getData(`user/${id}`, auth.token);

        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: res.data,
        });

        dispatch({
          type: PROFILE_TYPES.LOADING,
          payload: false,
        });
      } catch (err) {
        dispatch({
          type: TYPES.NOTIFY,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullName) {
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Please add your fullname." },
      });
    }

    if (userData.fullName.length > 25) {
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Fullname is too long." },
      });
    }

    if (userData.bio.length > 100) {
      return dispatch({
        type: TYPES.NOTIFY,
        payload: { error: "Bio is too long." },
      });
    }

    try {
      let media;
      dispatch({ type: TYPES.NOTIFY, payload: { loading: true } });
      if (avatar) media = await imageUpload([avatar]);

      const res = await patchData(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );

      dispatch({
        type: TYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({ type: TYPES.NOTIFY, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const follow =
  ({ users, user, auth }) =>
  async (dispatch) => {


    let newUser;
    if(users.every(item => item._id !== user._id)){
      newUser  = { ...user, followers: [...user.followers, auth.user] };
    }else {
      users.forEach(item => {
        if(item._id === user._id){
          newUser = {...item,followers: [...item.followers, auth.user] }
        }
      })
    }
    

    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: newUser,
    });

    dispatch({
      type: TYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      await patchData(`user/${user._id}/follow`, null, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unfollow =
  ({ users, user, auth }) =>
  async (dispatch) => {



    let newUser;
    if(users.every(item => item._id !== user._id)){
      newUser  = { ...user, followers: DeleteData(user.followers, auth.user._id)};
    }else {
      users.forEach(item => {
        if(item._id === user._id){
          newUser = { ...item, followers: DeleteData(item.followers, auth.user._id)};
        }
      })
    }
    

    dispatch({
      type: PROFILE_TYPES.UNFOLLOW,
      payload: newUser,
    });

    dispatch({
      type: TYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      },
    });

    try {
      await patchData(`user/${user._id}/unfollow`, null, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
