import Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'staging').required(),
  PORT: Joi.number().default(3000),

  APP_NAME: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  CORS_VALIDATION: Joi.boolean().required(),
  ORIGINS: Joi.string().empty(''),

  ACCESS_COOKIE_NAME: Joi.string().required(),
  REFRESH_COOKIE_NAME: Joi.string().required(),

  DB_DRIVER: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required()

  // AWS_S3_URL: Joi.string().required(),
  // AWS_S3_BUCKET: Joi.string().required(),
  // AWS_S3_REGION: Joi.string().required(),
  // AWS_S3_DIRECTORY_PREFIX: Joi.string().required(),
  // AWS_ACCESS_KEY: Joi.string().required(),
  // AWS_SECRET_KEY: Joi.string().required()
});

export default envSchema;
