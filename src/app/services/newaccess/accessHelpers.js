import { createContextualCan } from '@casl/react';
import { createContext } from 'react';

export const AccessContext = createContext();
export const Can = createContextualCan(AccessContext.Consumer);
