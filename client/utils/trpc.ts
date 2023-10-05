import { createTRPCReact } from '@trpc/react-query';
import type { appRouter } from '../../server/server';

export const trpc = createTRPCReact<appRouter>();
