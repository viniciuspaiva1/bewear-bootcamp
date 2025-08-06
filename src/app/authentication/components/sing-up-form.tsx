"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z
  .object({
    nome: z.string().trim().min(1, "Nome é obrigatório"),
    email: z.email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmationPassword: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres"),
  })
  .refine(
    (data) => {
      return data.password === data.confirmationPassword;
    },
    {
      error: "As senhas não coincidem.",
      path: ["confirmationPassword"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      password: "",
      confirmationPassword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await authClient.signUp.email({
      name: values.nome,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          if (error.error.code === "USER_ALREADY_EXISTS") {
            toast.error("Email já cadastrado.");

            return form.setError("email", {
              message: "Email já cadastrado.",
            });
          }
          toast.error(error.error.message);
        },
      },
    });
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cadastrar</CardTitle>
          <CardDescription>Crie sua conta para continuar.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid w-full gap-6">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder="Digite o seu email" {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmationPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmação de Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a sua senha novamente"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Entrar</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
