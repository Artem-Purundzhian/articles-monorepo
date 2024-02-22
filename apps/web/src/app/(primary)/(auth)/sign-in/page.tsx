'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const Page = () => {
  const [, setCookie] = useCookies(['access_token']);
  const { push } = useRouter();
  const { toast } = useToast();
  const form = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: TAuthCredentialsValidator) {
    try {
      const response = await fetch('http://localhost:3333/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
      });

      const res = await response.json();

      if (response.ok) {
        setCookie('access_token', res.access_token);
        push('/admin');
      } else {
        console.log(res);
        if (res.statusCode === 403) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Credentials incorrect',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
          });
        }
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  }

  return (
    <main className="mx-auto max-w-2xl container px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 mx-auto pt-8"
        >
          <FormLabel className="block text-center text-lg">Log in</FormLabel>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Page;
