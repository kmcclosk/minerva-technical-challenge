import { PropsWithChildren } from 'react';
import { useCurrentUser } from '../providers/UserProvider';
import { useRouter } from 'next/router';
import { isServer } from '../utils/helpers';

export function Authenticated({ children }: PropsWithChildren<{}>) {
  const router = useRouter();
  const { user } = useCurrentUser();

  if (isServer()) {
    return null;
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
}
