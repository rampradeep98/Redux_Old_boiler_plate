// ** Imports createContext function
import { createContext, useContext } from 'react';

// ** Imports createContextualCan function
import { createContextualCan } from '@casl/react';

// ** Create Context
export const AbilityContext = createContext();

// ** Init Can Context
export const Can = createContextualCan(AbilityContext.Consumer);
