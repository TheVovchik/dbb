import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setItemInLS } from '@/localstorage/localstorage';

const Index: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const slug = router.query || [];

    if (slug.token) {
      console.log(slug.token)
      setItemInLS('token', slug.token as string);

      router.push('/app');
    };
  }, [router.query]);

  return (
    <></>
  )
}

export default Index;
