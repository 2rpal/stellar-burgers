import { forwardRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import {
  selectConstructorItems,
  setBun,
  addIngredient
} from '../../services/slices/constructorSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems) ?? {
    bun: null,
    ingredients: [] as TIngredient[]
  };

  const ingredientsCounters = useMemo(() => {
    const bun = constructorItems?.bun ?? null;
    const fills = constructorItems?.ingredients ?? [];
    const counters: Record<string, number> = {};
    fills.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [constructorItems?.bun, constructorItems?.ingredients]);

  const handleIngredientClick = useCallback(
    (item: TIngredient) => {
      if (item.type === 'bun') {
        dispatch(setBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
    [dispatch]
  );

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      onIngredientClick={handleIngredientClick}
      ref={ref}
    />
  );
});
