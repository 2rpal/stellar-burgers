import styles from './ingredients-category.module.css';
import { forwardRef } from 'react';
import { TIngredientsCategoryUIProps } from './type';
import { BurgerIngredient } from '@components';

export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(
  (
    { title, titleRef, ingredients, ingredientsCounters, onIngredientClick },
    ref
  ) => (
    <>
      <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
        {title}
      </h3>
      <ul className={styles.items} ref={ref}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <div
              role='button'
              tabIndex={0}
              onClick={() => onIngredientClick?.(ingredient)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  onIngredientClick?.(ingredient);
              }}
              className={styles.itemWrapper}
            >
              <BurgerIngredient
                ingredient={ingredient}
                count={ingredientsCounters[ingredient._id] || 0}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
);
