import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutThunk } from '../../services/slices/authSlice';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    await dispatch(logoutThunk());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  return <ProfileMenuUI pathname={pathname} handleLogout={handleLogout} />;
};

export default ProfileMenu;
