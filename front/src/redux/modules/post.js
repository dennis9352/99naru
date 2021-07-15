import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";
const MODIFY_POST = "MODIFY_POST";
const DELETE_POST = "DELETE_POST";

const addPost = createAction(ADD_POST, (post) => ({post}))
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const modifyPost = createAction(MODIFY_POST, (post_list) => ({ post_list })); 

const initialState = {
  list: [], // prev state > post > list
};

const initialPost = {

}

const getpostDB = () => {
  return function (dispatch, getState, {history}) {
    axios
    .get('http://13.209.13.200/api/posts',
  {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
  ).then((response) => {
    console.log(response.data)
    dispatch(setPost(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
  }
};

const addPostDB = (text, list) => {
  console.log(text)
  console.log(list)
  return function (dispatch, getState, {history}){
    axios
    .post("http://13.209.13.200/api/posts",
    {text: text,},
    {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
    )
    .then((res) => {
      console.log(res)
      axios
      .get('http://13.209.13.200/api/posts',
    {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
    ).then((response) => {
      console.log(response.data)
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
      console.log(res)
      axios
      .get('http://13.209.13.200/api/posts',
    {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
    ).then((response) => {
      console.log(response.data)
      dispatch(setPost(response.data)) //디스패치
      })
      .catch((error) => {
        console.log(error);
      });
      })
      .catch((error) => {
        console.log(error);
      });
      // window.location.reload();
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
        console.log(res)
        axios
        .get('http://13.209.13.200/api/posts',
      {headers : {'Authorization': `Bearer ${sessionStorage.getItem("MY_SESSION")}`}}
      ).then((response) => {
        console.log(response.data)
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
        console.log(response.data)
        dispatch(setPost(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
    });
    
  }
}

const deleteCommentDB = (postId, commentId) => {
	console.log(postId, commentId)
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
				console.log(response.data)
				dispatch(setPost(response.data))
			}).catch((error) => {
				console.log(error)
			})
		})

	}
}

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.post.unshift(action.payload.post_list);
        console.log(action.payload.post)
      }),

    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [MODIFY_POST]: (state, action) =>
    produce(state, (draft) => {
      // 배열의 몇 번째에 있는 지 찾습니다.
      let idx = draft.list.findIndex((p) => p._id === action.payload.post_list);
      () => {
        console.log(action.payload.post_list)
      }
      // 해당 위치에 넣어줍니다.
      draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    }),
  },
  
  initialState
);

const actionCreators = {
  setPost,
  modifyPost,
  getpostDB,
  modifypostDB,
  addPostDB,
  deletePostDB,
  addCommentDB,
  deleteCommentDB,
};

export { actionCreators };
