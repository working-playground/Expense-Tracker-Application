import Joi from "joi";

export const transactionBodySchema = Joi.object({
  type: Joi.string().valid("income", "expense").required(),
  amount: Joi.number().positive().required(),
  description: Joi.string().allow("").optional(),
  category: Joi.string().required(),
  date: Joi.date().iso().required(),
});

export const transactionQuerySchema = Joi.object({
  type: Joi.string().valid("income", "expense").optional(),
  category: Joi.string().optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
  page: Joi.number().positive(),
  limit: Joi.number().positive(),
});

export const idParamSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});
