import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useLoginAccountMutation
} from "@/lib/react-query/queryAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Register = () => {
  const { toast } = useToast();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    }
  });

  // in the below function we actually renamed the mutateAsync to createUserAccount and isLoading to isCreatingUser to avoid confusion
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccountMutation();

  const { mutateAsync: loginAccount, isPending: isLoggingInUser } =
    useLoginAccountMutation();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        variant: "destructive",
        title: "Restration failed :( please try again"
      });
    }
    console.log("new user: ", newUser);
    console.log("Email: ", values.email);
    const session = await loginAccount({
      email: values.email,
      password: values.password
    });
    console.log("Session value: ", session);

    if (!session) {
      return toast({
        variant: "destructive",
        title: "LogIn failed :( please try again"
      });
    }

    const isLoggeddIn = await checkAuthUser();

    if (isLoggeddIn) {
      form.reset();
      navigate("./");
    } else {
      return toast({
        variant: "destructive",
        title: "sign up failed :( please try again."
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:420 flex-center flex-col">
        {/* <img src="/assets/images/logo.svg" alt="logo" /> */}
        <h1 className="text-5xl font-bold hover:text-violet-400 cursor-pointer hover:underline">
          SandGram
        </h1>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          to use SandGram, enter your account details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ligma Balls"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-700" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="caseOh"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-700" />
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
                  <Input
                    type="email"
                    placeholder="tylerdurden@mayhem.com"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-700" />
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
                  <Input
                    type="password"
                    placeholder=";)"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-700" />
              </FormItem>
            )}
          />
          <div className="my-auto flex-center items-center mt-4 w-full">
            {isCreatingAccount ? (
              <Button
                type="submit"
                className="shad-button_primary py-auto"
                disabled
              >
                <Loader /> Let him Cook...
              </Button>
            ) : (
              <Button type="submit" className="shad-button_primary py-auto">
                Submit
              </Button>
            )}
          </div>
          <p className="flex-center mt-2 text-small-regular text-light-2">
            Already have an account?
            <Link
              to="/login"
              className=" text-primary-500 hover:underline font-semibold cursor-pointer mx-2"
            >
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Register;
