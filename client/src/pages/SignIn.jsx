import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFiler, loginStart, loginSuccess } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { auth, Provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;
const Title = styled.h1``;
const Title1 = styled.h2``;
const Input = styled.input``;
const Button = styled.button``;

function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const HandleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signIn', {
        email,
        password,
      });
      console.log(res.data);
      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginFiler());
    }
  };
  const HandleSignUp = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signup', {
        name,
        email,
        password,
      });
      console.log(res.data);
      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginFiler());
    }
  };
  const signInGoogle = async () => {
    signInWithPopup(auth, Provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign In </Title>
        <Title1>To continue on Youtube </Title1>
        <Input
          type={'email'}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type={'password'}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Link to="/" target="_blank" style={{ textDecoration: 'none' }}>
          <Button onClick={HandleLogin} type={'submit'}>
            Sign in
          </Button>
        </Link>

        <Title>Or</Title>
        <Button onClick={signInGoogle} type={'submit'}>
          Sign with Google
        </Button>
        <Title>Or</Title>
        <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <Input
          type={'email'}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <Input
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <Button onClick={HandleSignUp}>SignUp</Button>
      </Wrapper>
    </Container>
  );
}

export default SignIn;
