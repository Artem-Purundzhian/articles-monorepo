import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  console.log(token?.value);

  if (token?.value) {
    console.log('try fetching');
    try {
      const response = await fetch('http://localhost:3333/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      });

      const res = await response.json();

      if (response.ok) {
        if (res.email) {
          console.log(res);
        } else {
          redirect('/sign-in');
        }
      } else {
        console.log(res);
        redirect('/sign-in');
      }
    } catch (err) {
      console.log(err);
      redirect('/sign-in');
    }
  } else {
    redirect('/sign-in');
  }

  return <main className="mx-auto max-w-2xl container px-4"></main>;
};

export default Page;
