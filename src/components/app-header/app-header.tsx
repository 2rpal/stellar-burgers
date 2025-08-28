import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/userSlice';
import { selectIsAuthed } from '../../services/selectors/auth';
import { AppHeaderUI } from '../../components/ui/app-header'; // путь под твой индекс

export const AppHeader: FC = () => {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const authed = useSelector(selectIsAuthed);

  return (
    <AppHeaderUI
      pathname={pathname}
      authed={authed}
      userName={user?.name || ''}
    />
  );
};
