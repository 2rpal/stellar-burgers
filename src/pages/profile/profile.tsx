import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectUser,
  selectUserUpdating,
  fetchUser,
  updateUser
} from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const updating = useSelector(selectUserUpdating);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prev) => ({
      ...prev,
      name: user?.name ?? '',
      email: user?.email ?? ''
    }));
  }, [user?.name, user?.email]);

  const isFormChanged = useMemo(
    () =>
      (!!user &&
        (formValue.name !== user.name || formValue.email !== user.email)) ||
      !!formValue.password,
    [user, formValue.name, formValue.email, formValue.password]
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;

    const changes: Partial<{ name: string; email: string; password: string }> =
      {};
    if (formValue.name !== user.name) changes.name = formValue.name;
    if (formValue.email !== user.email) changes.email = formValue.email;
    if (formValue.password) changes.password = formValue.password;

    if (Object.keys(changes).length) {
      dispatch(updateUser(changes));
      // очищаем пароль локально (UI/UX)
      setFormValue((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
