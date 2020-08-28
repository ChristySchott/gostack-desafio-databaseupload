import { getRepository } from 'typeorm';
import Category from '../models/Category';

import AppError from '../errors/AppError';

interface Request {
  title: string;
}

class CreateUserService {
  public async execute({ title }: Request): Promise<Category> {
    const categorysRepository = getRepository(Category);

    const checkCategoryExists = await categorysRepository.findOne({
      where: { title },
    })

    if (checkCategoryExists) {
      throw new AppError('Category address already used.');
    }

    const category = categorysRepository.create({
      title
    });

    await categorysRepository.save(category);

    return category;
  }
}

export default CreateUserService;
