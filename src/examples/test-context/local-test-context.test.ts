import { LocalTestContext } from '@/src/examples/test-context/local-test-context';

import { it, expect } from 'vitest';
beforeEach<LocalTestContext>(async (context) => {
  // typeof context is 'TestContext & LocalTestContext'
  context.foo = 'bar';
  context.todos = [];
  context.archive = [];
  context.todos.push(1, 2, 3);
});

it<LocalTestContext>('should work foo', ({ foo, todos }) => {
  // typeof foo is 'string'
  console.log(foo); // 'bar'
  expect(foo).toBe('bar');
  expect(todos.length).toBe(3);

  todos.push(4);
  expect(todos.length).toBe(4);
});

it<LocalTestContext>('add items to todos', ({ todos }) => {
  expect(todos.length).toBe(3);

  todos.push(4);
  expect(todos.length).toBe(4);
});

it<LocalTestContext>('move items from todos to archive', ({
  todos,
  archive,
}) => {
  expect(todos.length).toBe(3);
  expect(archive.length).toBe(0);

  archive.push(todos.pop());
  expect(todos.length).toBe(2);
  expect(archive.length).toBe(1);
});

it('should work', (ctx) => {
  expect(ctx.meta.name).toBe('should work');
});

it('should really work', ({ meta }) => {
  expect(meta.name).toBe('should really work');
});

it('should have version of `expect` bound to the current test', (ctx) => {
  ctx.expect(ctx.expect).not.toBe(expect);
});
