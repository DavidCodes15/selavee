'use server';

import { createAsyncCaller } from '.';
import { redirect } from 'next/navigation';

export const getAuthUser = async ({
  shouldRedirect = true,
}: {
  shouldRedirect?: boolean;
} = {}) => {
  const caller = await createAsyncCaller();
  return caller.user.getMe(undefined).then((result) => result.data.user).catch((e) => {
    if (e.code === 'UNAUTHORIZED' && shouldRedirect) {
        return "not authorized"
    }
    return null;
  })
};