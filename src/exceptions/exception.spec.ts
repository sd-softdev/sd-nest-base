import { DuplicateKeyException } from './duplicate.exception';

describe('Exception', () => {
  it('should be defined', () => {
    const ex = new DuplicateKeyException('');
    expect(ex).toBeDefined();
  });

  it('throw exception', () => {
    const ex = new DuplicateKeyException('');
    const fun = () => ex.throwExceptionForTesting();

    expect(fun).toThrowError(ex);
  });

  it('throw exception async', async () => {
    expect.assertions(1);
    const ex = new DuplicateKeyException('name');

    await expect(ex.throwExceptionForTestingAsync()).rejects.toThrowError(ex);
  });
});
