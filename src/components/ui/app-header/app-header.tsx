import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

type Props = {
  pathname?: string; // <-- теперь опциональные
  authed?: boolean;
  userName?: string;
};

export const AppHeaderUI: FC<Props> = ({
  pathname = '/', // <-- дефолты для Storybook
  authed = false,
  userName
}) => {
  const constructorActive =
    pathname === '/' || pathname.startsWith('/ingredients');
  const feedActive = pathname.startsWith('/feed');
  const profileActive = pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={clsx(styles.link, 'p-4', {
              [styles.link_active]: constructorActive
            })}
          >
            <BurgerIcon type={constructorActive ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>

          <NavLink
            to='/feed'
            className={clsx(styles.link, 'p-4', {
              [styles.link_active]: feedActive
            })}
          >
            <ListIcon type={feedActive ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <NavLink to='/'>
            <Logo className='' />
          </NavLink>
        </div>

        <div className={styles.link_position_last}>
          <NavLink
            to={authed ? '/profile' : '/login'}
            className={clsx(styles.link, 'p-4', {
              [styles.link_active]: profileActive && authed
            })}
          >
            <ProfileIcon
              type={profileActive && authed ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
