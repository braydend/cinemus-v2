import { serverHandlers } from './handlers/serverHandlers';
import { tmdbHandlers } from './handlers/tmdbHandlers';

export const handlers = [...serverHandlers, ...tmdbHandlers];
