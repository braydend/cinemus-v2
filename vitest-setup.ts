import * as matchers from 'vitest-dom/matchers';
import { expect } from 'vitest';
expect.extend(matchers);

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './tests/msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
