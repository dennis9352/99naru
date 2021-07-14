import React from "react";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements";

import {
  IoTrash,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const CommentList = (props) => {
  // console.log(props.comments._id)
  // console.log(props.post_info.post_data._id)
  const postId = props.comments._id
  const commentId = props.post_info.post_data._id
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user_id)
  const deleteComent = () => {
    dispatch(postActions.deleteCommentDB(postId, commentId))
  }

  return (
    <Grid is_flex padding="0px 16px 0px 16px">
      <Grid center is_flex width="20%">
        <Text bold>{props.comments.userId.nickname}</Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Grid width="70%">
          <Text margin="0px 0px 0px 5px">
            {props.comments.text}
          </Text>
        </Grid>
        <Grid is_flex width="100%">
          <Grid right>
            <Text>{props.comments.created_at.split("T")[0]}</Text>
          </Grid>
          <Grid is_flex width="100" padding="0px 10px">
            <IconWrap>
              {user_info===props.comments.userId._id?<IoTrash onClick={deleteComent}/>:<div></div>}
            </IconWrap>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const IconWrap = styled.div`
  width: 100%;
  /* padding: 0px 0rem; */
  /* margin: 2rem 0px; */
  text-align: right;
  font-size: 2rem;
  color: #1da1f2;
  cursor: pointer;
`;

export default CommentList;
