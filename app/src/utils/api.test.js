import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { formatUTCDate } from './api.ts';

const names = ['first', 'second', 'third'];

const server = setupServer(
  rest.post('/names', (req, res, ctx) => {
    return res(ctx.json(names));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('time formats to UTC', () => {
  const srcDate = '2020-12-14 22:08:40 +0200';
  const destDate = '2020-12-14T20:08:40Z';

  expect(formatUTCDate(srcDate)).toBe(destDate);
});
