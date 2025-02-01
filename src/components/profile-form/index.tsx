"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  expertiseLevels,
  languages,
  programmingLanguages,
  projectDomains,
  projectRoles,
} from "@/lib/constants";
import { MultiselectCombobox } from "../ui/multiselect-combobox";
import { Combobox } from "../ui/combobox";
import { formSchema } from "./schema";
import { useAuth } from "@clerk/nextjs";

export function ProfileForm({
  submit,
  defaultValues,
}: {
  submit: (userId: string, values: z.infer<typeof formSchema>) => Promise<void>;
  defaultValues?: z.infer<typeof formSchema>;
}) {
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      lastName: "",
      userName: "",
      description: "",
      url: "",
      projectRoles: [],
      projectDomains: [],
      expertiseLevel: "",
      spokenLanguages: [],
      programmingLanguages: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (userId) {
        const res = await submit(userId, values);

        console.log(res);
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
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
                  placeholder="Tell us about yourself"
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
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter your URL" {...field} />
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
              <FormLabel>Project Roles</FormLabel>
              <FormControl>
                <MultiselectCombobox
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
              <FormLabel>Project Domains</FormLabel>
              <FormControl>
                <MultiselectCombobox
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
          name="spokenLanguages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spoken Languages</FormLabel>
              <FormControl>
                <MultiselectCombobox
                  options={languages.map((language) => ({
                    value: language,
                    label: language,
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
          name="programmingLanguages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programming Languages</FormLabel>
              <FormControl>
                <MultiselectCombobox
                  options={programmingLanguages.map((language) => ({
                    value: language,
                    label: language,
                  }))}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {defaultValues ? "Update" : "Create"} Profile
        </Button>
      </form>
    </Form>
  );
}
