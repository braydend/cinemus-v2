import 'vitest-dom/extend-expect';

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './tests/msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
