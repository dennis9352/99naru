import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const SET_POST = "SET_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));

const initialState = {
  list: [], // prev state > post > list
};

const getpostDB = () => {
  return function (dispatch, getState, {history}) {
    axios
    .get('http://13.209.13.200/api/posts',
  {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
  ).then((response) => {
    dispatch(setPost(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
  }
};

const addPostDB = (text, list) => {
  return function (dispatch, getState, {history}){
    axios
    .post("http://13.209.13.200/api/posts",
    {text: text,},
    {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
    )
    .then((res) => {
      axios
      .get('http://13.209.13.200/api/posts',
    {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
    ).then((response) => {
      dispatch(setPost(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
    });

  }
  }

  const deletePostDB = (post_id) => {
    return function (dispatch,getState,{history}){
    axios
      .delete(`http://13.209.13.200/api/posts/${post_id}`,
      {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
    ).then((res) => {
      axios
      .get('http://13.209.13.200/api/posts',
    {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
    ).then((response) => {
      dispatch(setPost(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
      })
      .catch((error) => {
        console.log(error);
      });
      history.replace("/main/home");

    }  
    }

const modifypostDB = (post_id, editPost) => {
    return function (dispatch, getState, {history}){
      axios
      .put(`http://13.209.13.200/api/posts/${post_id}`, {
          text: `${editPost}`,
      },{headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}})
      .then((res) => {
        axios
        .get('http://13.209.13.200/api/posts',
      {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
      ).then((response) => {
        dispatch(setPost(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
      });


    }
};

const addCommentDB = (postId, comments) => {
  return function (dispatch, getState, {history}){
    axios
    .post("http://13.209.13.200/api/comments", {
      postId: postId,
      text: comments,
    },{headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}})
    .then((res) => {
      axios
        .get('http://13.209.13.200/api/posts',
      {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
      ).then((response) => {
        dispatch(setPost(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
    });
    
  }
}

const deleteCommentDB = (postId, commentId) => {
	return function (dispatch, getState, { history }) {
		axios.delete(`http://13.209.13.200/api/comments/${commentId}`, {
			data: { postId },
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('MY_SESSION')}`
			}
		}).then((res) => {
			axios.get('http://13.209.13.200/api/posts',
				{
					headers: {
						'Authorization': `Bearer ${sessionStorage.getItem(
							'MY_SESSION')}`
					}
				}
			).then((response) => {
				dispatch(setPost(response.data))
			}).catch((error) => {
				console.log(error)
			})
		})

	}
}

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionCreators = {
  getpostDB,
  modifypostDB,
  addPostDB,
  deletePostDB,
  addCommentDB,
  deleteCommentDB,
};

export { actionCreators };
