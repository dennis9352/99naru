import React from "react";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import axios from 'axios';
import {useSelector, useDispatch} from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const post_id = useSelector((state) => state.post.list);
  const [comments,setComments] = React.useState("");
  const addComment = () => {
    if (comments === "") {
        window.alert("채워주세요!")
        return;
    } 
    dispatch(postActions.addCommentDB(props.post_id,comments))
}

  return (
    <React.Fragment>
      <Grid padding="5px" is_flex height="10px">
        <Input _onChange={(e) => {setComments(e.target.value)}} placeholder="댓글 내용을 입력해주세요" />
        <Button _onClick={addComment} type="text" width="80px" margin="0px 2px 0px 2px">
          작성하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
