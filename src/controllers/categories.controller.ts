import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { CategoriesRepository } from '../database/repositories/categories.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import { CreateCategoryDTO } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';
export class CategoriesController {
  async create(
    req: Request<unknown, unknown, CreateCategoryDTO>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const validateSchema = z.object({
        title: z.string(),
        color: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
      });

      validateSchema.parse(req.body);

      const { title, color } = req.body;

      const repository = new CategoriesRepository(CategoryModel);

      const service = new CategoriesService(repository);

      const result = await service.create({ title, color });

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
