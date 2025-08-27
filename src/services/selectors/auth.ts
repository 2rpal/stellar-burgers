import { RootState } from '../../services/rootReducer';
import { getCookie } from '../../utils/cookie';

export const selectIsAuthed = (s: RootState) =>
  Boolean(s.user?.data) || Boolean(getCookie('accessToken'));
