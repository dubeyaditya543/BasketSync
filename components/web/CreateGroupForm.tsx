"use client";

import { GroupFormValues, groupSchema } from "@/lib/validations/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { createGroupAction } from "@/lib/actions/group-action";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

export function CreateGroupForm() {
  const { user } = useAuth();
  const authAction = useAuthAction();
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema as any),
    values: {
      groupName: "",
    },
  });

  async function handleGroupFormSubmit(data: GroupFormValues) {
    setServerError(null);

    const formData = new FormData();
    formData.append("groupName", data.groupName);

    const result = await authAction(createGroupAction, { success: false }, formData);

    if (!result.success) {
      setServerError(result.error ?? "Something went wrong");
      return;
    }

    form.reset();
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Card className="overflow-hidden border-slate-200/80 shadow-lg">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-[#0c5443]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            </div>
            <CardTitle className="text-base font-bold">Create Group</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          {serverError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              {serverError}
            </div>
          )}
          <form onSubmit={form.handleSubmit(handleGroupFormSubmit)} className="space-y-4">
            <Controller
              name="groupName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-600">Group Name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="e.g. Home Essentials"
                    aria-invalid={fieldState.invalid}
                    className="h-10 rounded-xl border-slate-200 text-sm focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </Field>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full cursor-pointer rounded-xl bg-[#0c5443] py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#094738]"
            >
              {form.formState.isSubmitting ? "Creating…" : "Create Group"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
