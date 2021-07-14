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

export default function SignInSide() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const login = () => {
    console.log(id,pwd)
    dispatch(userActions.loginDB(id, pwd))
  }
  const goSignup = () => {
    window.location.href = "/signup"
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            로그인
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
              name="ID"
              autoFocus
            />
            <TextField
              onChange={(e) => {setPwd(e.target.value)}}

              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              // type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              onClick={login}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              로그인
            </Button>
            <Button
              onClick={goSignup}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              회원가입 하러가기
            </Button>

          </form>
        </div>
      </Grid>
    </Grid>
  );
}