import { Button } from '../components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const formSchema = z.object({
  email: z.string().min(1, { message: "Email must not be empty" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenirea comportamentului implicit de trimitere a formularului

    try {
      const url = `${import.meta.env.VITE_BASE_URL}auth/signin`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        login(); // Update authentication state upon successful login
        navigate('/auth/dashboard');
      } else {
        const error = await res.json();
        console.error("Error:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Succes")
  };
  

  return (
    <div className='flex flex-row h-screen'>
      <div className='flex flex-col justify-center items-center w-1/2 bg-gray-100'>
        <h1 className='text-3xl font-bold mt-4'>Hello, Welcome Back</h1>
        <p className='mt-2 text-gray-600'>Quis sagittis, velit est vitae.</p>
        <img src='/path/to/your/image.png' alt='Illustration' className='h-1/2' />
      </div>
      <div className='flex flex-col justify-center items-center w-1/2 bg-white'>
        <Form {...form}>
          <form 
            onSubmit={(e) => form.handleSubmit((values) => onSubmit(values, e))(e)} // Trimiterea corectă a evenimentului pentru onSubmit
            className="space-y-4 w-3/4"
          >
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
                    <Input placeholder="+6 characters" type="password" {...field} className="w-full rounded-lg" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-lg text-black bg-blue-800">
              Login
            </Button>
          </form>
        </Form>
        <div>
          <h1>Don't have an account <a href="/auth/register" className='text-blue-700'>Register</a></h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
