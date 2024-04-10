import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const passwordHashed = await bcrypt.hash(password, 10);

  return passwordHashed;
};

export const comparePassword = async (
  password: string,
  passwordHashed: string
): Promise<boolean> => {
  const isPasswordMatched = await bcrypt.compare(password, passwordHashed);

  return isPasswordMatched;
};
