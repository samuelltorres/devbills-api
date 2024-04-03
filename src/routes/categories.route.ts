import { Router } from 'express';

import { CategoriesController } from '../controllers/categories.controller';
import { createCategorySchema } from '../dtos/categories.dto';
import { ParamsType, validator } from '../middlewares/validator.middleware';

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.post(
  '/',
  validator({
    schema: createCategorySchema,
    type: ParamsType.BODY,
  }),
  controller.create,
);
