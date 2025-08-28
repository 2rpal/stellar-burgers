import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import {
  registerThunk,
  selectAuthError,
  selectAuthLoading
} from '../../services/slices/authSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await dispatch(
      registerThunk({ name: userName, email, password })
    );
    if (registerThunk.fulfilled.match(res)) {
      navigate('/', { replace: true });
    }
  };

  return (
    <RegisterUI
      errorText={loading ? '' : error ?? ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
