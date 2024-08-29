import { cookies } from 'next/headers';
export const logoutHandler = async () => {
    try {
      cookies().set('token', '', {
        maxAge: -1,
      });
      return { status: 'success' };
    } catch (err: any) {
      throw err;
    }
  };