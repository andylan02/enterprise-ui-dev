import { useDispatch } from './../packing-list-revisited/store/hooks';
import { test, expect, vi } from 'vitest';
import { log } from './log';
import { useSelector } from 'react-redux';

// requestFromApi('/');
vi.mock('react-redux', (args) => {
  return {
    useDispatch() {
      return {};
    },
    useSelector() {},
  };
});

test('it spies on the multiply method', () => {
  const mock = vi.fn((x?: string) => {
    if (x) {
      return x?.repeat(3);
    }
  });
  mock();
  mock();
  mock();
  mock();

  expect(mock).toHaveBeenCalled();

  const result = mock('wow');
  expect(mock).toHaveBeenLastCalledWith('wow');
  expect(result).toMatchInlineSnapshot('"wowwowwow"');

  vi.spyOn(console, 'log');
  log('log', 1, 2, 3);

  vi.spyOn(console, 'log').mockImplementation(() => {});
  log('log', 1, 2, 3);

  log('error', 1, 2, 3, 4);
  log('warn', 1, 2, 3, 5, 6);

  expect(console.log).toHaveBeenCalled();
  expect(console.log).toHaveBeenCalledWith(1, 2, 3);
  expect(console.log).not.toHaveBeenCalledWith(1, 2, 3, 4);
});
