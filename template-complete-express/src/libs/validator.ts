export const formatZodError = (error: Zod.ZodError) => {
  return error.errors.map(err => {
    const { path, message } = err;

    return {
      path,
      message,
    };
  });
};
