import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useSignInAccount } from "@/lib/tanstack-query/queryAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isuserLoading } = useUserContext();

  // query signin
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  //  Defining form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //  Defining a submit handler.
  const handleSubmitSignin = async (
    values: z.infer<typeof SigninValidation>
  ) => {
    const session = await signInAccount(values);

    if (!session) {
      return toast({ title: "Login failed, please try again" });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Login failed, please try again" });
      return;
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h3 className="h1-bold md:h3-bold">
          <span className="text-violet-400">E</span>nbik
          <span className="text-violet-400 ml-[-5px]">S</span>ocial
        </h3>
        <h2 className="h3-bold md:h2-bold pt-5 md:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mb-5 flex-wrap">
          Welcome back!, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSubmitSignin)}
          className="flex flex-col gap-5 w-full mt-4 "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className=" font-semibold shad-input"
                    placeholder="Email"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className=" font-semibold shad-input"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary mt-5">
            {isuserLoading || isPending ? (
              <div className="flex-center gap-2">
                <Loader /> Loading..
              </div>
            ) : (
              "Login "
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to={"/sign-up"}
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
