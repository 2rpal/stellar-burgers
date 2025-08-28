import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import {
  loginThunk,
  selectAuthError,
  selectAuthLoading
} from '../../services/slices/authSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(res)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <LoginUI
      errorText={loading ? '' : error ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
