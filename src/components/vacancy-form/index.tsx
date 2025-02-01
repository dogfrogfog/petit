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
import { expertiseLevels, projectDomains, projectRoles } from "@/lib/constants";

export function VacancyForm({
  projectId,
  companyId,
  submit,
  defaultValues,
}: {
  id: number;
  projectId: number;
  companyId: number;
  submit: (
    id: number,
    values: z.infer<typeof formSchema> & {
      projectId: number;
      companyId: number;
    }
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
      requirements: "",
      salary: "",
      projectRoles: "",
      projectDomains: "",
      expertiseLevel: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (userId) {
        const res = await submit(projectId, {
          ...values,
          projectId,
          companyId,
        });
        console.log(res);
        router.push(`/profile/projects/${projectId}`);
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
              <FormLabel>Vacancy Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter vacancy name" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the vacancy"
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
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List the requirements"
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
              <FormLabel>Status</FormLabel>
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
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input placeholder="Enter salary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectRoles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Role</FormLabel>
              <FormControl>
                <Combobox
                  options={projectRoles.map((role) => ({
                    value: role,
                    label: role,
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
          name="projectDomains"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Domain</FormLabel>
              <FormControl>
                <Combobox
                  options={projectDomains.map((domain) => ({
                    value: domain,
                    label: domain,
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
          name="expertiseLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expertise Level</FormLabel>
              <FormControl>
                <Combobox
                  options={expertiseLevels.map((level) => ({
                    value: level,
                    label: level,
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {defaultValues ? "Update" : "Create"} Vacancy
        </Button>
      </form>
    </Form>
  );
}
