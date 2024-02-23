import AdminList from '@/components/admin-list';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

async function CreateArticle() {
  // try {
  //   const response = await fetch('http://localhost:3333/articles', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ ...data }),
  //   });
  //   const res = await response.json();
  //   if (response.ok) {
  //     console.log('articles')
  //   } else {
  //     console.log(res);
  //     toast({
  //       variant: 'destructive',
  //       title: 'Uh oh! Something went wrong.',
  //       description: 'There was a problem with your request.',
  //     });
  //   }
  // } catch (err) {
  //   console.log(err);
  //   toast({
  //     variant: 'destructive',
  //     title: 'Uh oh! Something went wrong.',
  //     description: 'There was a problem with your request.',
  //   });
  // }
}

const Page = () => {
  return (
    <main className="mx-auto max-w-2xl container px-4 text-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="mx-auto my-4">
            Create new article
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new article</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AdminList />
    </main>
  );
};

export default Page;
