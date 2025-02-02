"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "./schema";
import { useAuth } from "@clerk/nextjs";
import { Combobox } from "../ui/combobox";
import { Textarea } from "../ui/textarea";

export function ProjectForm({
  id,
  companyId,
  submit,
  defaultValues,
}: {
  id: number;
  companyId: number;
  submit: (
    id: number,
    values: z.infer<typeof formSchema> & { companyId: number }
  ) => Promise<void>;
  defaultValues?: z.infer<typeof formSchema>;
}) {
  const { userId } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      status: "open",
      description: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (userId) {
        const res = await submit(id, { ...values, companyId });

        console.log(res);
        router.push("/dashboard/projects");
      }
    } catch {
      console.log("error submitting form data");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название проекта</FormLabel>
              <FormControl>
                <Input placeholder="Введите название проекта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание проекта</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Описание проекта"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус проекта</FormLabel>
              <FormControl>
                <Combobox
                  options={["open", "closed"].map((v) => ({
                    value: v,
                    label: v,
                  }))}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на проект</FormLabel>
              <FormControl>
                <Input placeholder="Введите ссылку на проект" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {defaultValues ? "Обновить" : "Создать"} проект
        </Button>
      </form>
    </Form>
  );
}
