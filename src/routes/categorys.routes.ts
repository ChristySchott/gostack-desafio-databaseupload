import { Router } from 'express';

import CreateCategoryService from '../services/CreateCategoryService';

const categorysRouter = Router();

categorysRouter.post('/', async (request, response) => {
  try {
    const { title } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({
      title,
    });

    return response.json(category);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default categorysRouter;
