import { RefObject } from 'react';
import { TIngredient } from '@utils-types';

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
  onIngredientClick?: (item: TIngredient) => void;
};