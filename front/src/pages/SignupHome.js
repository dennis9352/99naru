import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignupSide() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [nick, setNick] = React.useState("");
  const goSignin = () => {
    window.location.href = "/"
  }
  const duplicateCheck = () => {
    console.log('sdf')
    axios
    .post(`http://localhost:3000/api/duplicate`, {
      loginId : `${id}`,
      nickname : `${nick}`,
    },)
    .then((res) => {
      console.log(res)
    }).catch(function(err) {
      window.alert("형식을 맞춰주세요!")
    });
  }
  
  const signup = () => {
  if (id==="" || pwd==="" || pwd_check==="" || nick==="") {
    window.alert("전부 채워주세요!");
    return;
  }
  if (pwd !== pwd_check) {
    window.alert("비밀번호가 일치하지 않습니다!");
    return;
  }
  if (id.length < 3) {
    window.alert("아이디 최소 3글자")
    return;
  }
  if (pwd.length < 6) {
    window.alert("비밀번호 최소 6글자")
    return;
  }
  if (nick.length < 3) {
    window.alert("닉네임 최소 3글자")
    return;
  }
  console.log(id, pwd, nick)
  dispatch(userActions.signupDB(id, pwd, nick))
};

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(e) => {setId(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ID"
              label="ID"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => {setNick(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="NickName"
              autoFocus
            />
            <Button
              onClick={duplicateCheck}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              아이디/닉네임 중복확인
            </Button>
            <TextField
              onChange={(e) => {setPwd(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
            //   type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              onChange={(e) => {setPwdCheck(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
            //   type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              onClick={signup}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              회원가입
            </Button>
            <Button
              onClick={goSignin}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              로그인 하러가기
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}