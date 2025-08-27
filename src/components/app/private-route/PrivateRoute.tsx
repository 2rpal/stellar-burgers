import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../services/store';
import { getCookie } from '../../../utils/cookie';
import { selectUser, fetchUser } from '../../../services/slices/userSlice';

type Props = {
  children: ReactNode;
  enforce?: boolean;
  redirectTo?: string;
  fallback?: ReactNode | null;
};

export function PrivateComponent({
  children,
  enforce = true,
  redirectTo = '/login',
  fallback = null
}: Props) {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const hasToken = Boolean(getCookie('accessToken'));

  const [checked, setChecked] = useState(() => !hasToken);

  useEffect(() => {
    let cancelled = false;
    const ensureUser = async () => {
      try {
        if (hasToken && !user) await dispatch(fetchUser());
      } finally {
        if (!cancelled) setChecked(true);
      }
    };
    if (!checked) ensureUser();
    return () => {
      cancelled = true;
    };
  }, [hasToken, user, checked, dispatch]);

  if (!enforce) return <>{children}</>;
  if (!checked) return <>{fallback}</>;

  const isAuthed = Boolean(user) || hasToken;
  if (!isAuthed) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
