import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPasswordApi } from '../../utils/burger-api';
import { ResetPasswordUI } from '@ui-pages';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', {
        replace: true,
        state: { from: location }
      });
    }
  }, [navigate, location]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!password || !token) {
      setError('Введите новый пароль и код из письма');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await resetPasswordApi({ password, token });
      localStorage.removeItem('resetPassword');
      navigate('/login', { replace: true });
    } catch (err: any) {
      const msg =
        err?.message ||
        err?.error ||
        'Не удалось сохранить новый пароль. Попробуйте ещё раз.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ResetPasswordUI
      errorText={submitting ? '' : error ?? ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
