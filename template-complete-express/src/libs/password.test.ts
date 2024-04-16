import { hashPassword, comparePassword } from './password';

describe('password lib test', () => {
  it('should hash password', async () => {
    const password = 'password';
    const passwordHashed = await hashPassword(password);

    expect(passwordHashed).not.toBe(password);
  });

  it('should compare password', async () => {
    const password = 'password';
    const passwordHashed = await hashPassword(password);
    const isPasswordMatched = await comparePassword(password, passwordHashed);

    expect(isPasswordMatched).toBe(true);
  });
});
