import { Button } from '../components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl,  FormField, FormItem, FormLabel } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Checkbox  } from '../components/ui/checkbox'; 


const formSchema = z.object({
  firstname: z.string().min(1, {
    message: "First name must not be empty",
  }),
  lastname: z.string().min(1, {
    message: "Last name must not be empty",
  }),
  email: z.string().min(1, {
    message: "Email must not be empty",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  checkbox: z.boolean().refine(value => value === true, {
    message: "Please agree to the terms and services.",
  }),
});

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      checkbox: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className='flex flex-row h-screen '>
      <div className='flex flex-col justify-center items-center w-1/2 bg-gray-100'>
        
        <h1 className='text-3xl font-bold mt-4'>Let's Grow Your Business!</h1>
        <p className='mt-2 text-gray-600'>Verra gravida puruituent pharetra amet, lorem lacinia.</p>
        <img src='\src\picture.jpg' alt='Illustration' className='h-full/2' /> 
      </div>
      <div className='flex flex-col justify-center items-center w-1/2 bg-white'>
        <h2 className='text-3xl font-bold mb-4'>Create Account</h2>
        <Button type="button" className="w-3/4 rounded-lg mb-4 bg-red-500 ">
          Sign up with Google
        </Button>
        <Button type="button" className="w-3/4 rounded-lg mb-4 bg-blue-800 ">
          Sign up with Facebook
        </Button>
        <span className='mb-4'>or</span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-3/4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="w-full rounded-lg" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="w-full rounded-lg" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="yourmail@mail.com" {...field} className="w-full rounded-lg" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="+6 character" type="password" {...field} className="w-full rounded-lg" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkbox"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <Checkbox  className='rounded-md' />
                    <FormLabel className="ml-2">I agree with terms and services</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-lg text-black bg-blue-800 ">
              Create Account
            </Button>
          </form>
        </Form>
          <div>
            <h1>Have an account? <a href="/auth/login"  className='text-blue-700'>Login</a> </h1>
          </div>
      </div>
    </div>
  );
};

export default Register;