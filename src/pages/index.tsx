import { getItemFromLS } from '@/localstorage/localstorage';
import { Dropbox } from 'dropbox';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const Index: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getItemFromLS('token');

    if (token) {
      const dbx = new Dropbox({
        accessToken: token,
      })

      dbx.filesListFolder({
        path: '',
      }).then(res => router.push('/app'))
      .catch(err => router.push(`${process.env.NEXT_PUBLIC_MY_REDIRECT_URI}/auth`));
    };

    router.push(`${process.env.NEXT_PUBLIC_MY_REDIRECT_URI}/auth`);
  }, [])

  return (
    <></>
  )
}

export default Index;
