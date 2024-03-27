import { mockedData } from '@/tests/data';

describe('validate mocked data', () => {
  it('should have a name', () => {
    expect(mockedData.name).toBe('John Doe');
  });
});
