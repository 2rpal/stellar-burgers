import { FC, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectConstructorItems } from '../../services/slices/constructorSlice';
import {
  selectOrderRequest,
  selectOrderModalData,
  placeOrderThunk,
  closeOrderModal
} from '../../services/slices/orderSlice';
import { selectIsAuthed } from '../../services/selectors/auth';

export const BurgerConstructor: FC = () => {
  const raw = useSelector(selectConstructorItems);
  const bun = raw?.bun ?? null;
  const fills: TConstructorIngredient[] = raw?.ingredients ?? [];

  const orderRequest = useSelector(selectOrderRequest) ?? false;
  const orderModalData = useSelector(selectOrderModalData) ?? null;

  const isAuthed = useSelector(selectIsAuthed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onOrderClick = useCallback(() => {
    if (!bun || orderRequest) return;
    if (!isAuthed) {
      navigate('/login', { state: { from: location } });
      return;
    }
    const ids = [bun._id, ...fills.map((i) => i._id), bun._id];
    dispatch(placeOrderThunk(ids));
  }, [bun, fills, orderRequest, isAuthed, navigate, location, dispatch]);

  const closeOrderModalCb = useCallback(() => {
    dispatch(closeOrderModal());
  }, [dispatch]);

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      (fills ?? []).reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, fills]
  );

  const constructorItems = { bun, ingredients: fills };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModalCb}
    />
  );
};
