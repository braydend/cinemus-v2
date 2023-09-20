import type { DefaultSession } from '@auth/core/types';

export type CustomSession = DefaultSession['user'] & { id?: string };
