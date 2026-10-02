"use client"

import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { JoinGroupFormValues, joinGroupSchema } from "@/lib/validations/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { authFetch } from "@/lib/authFetch";

export function JoinGroupCard() {
  const { user } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<JoinGroupFormValues>({
    resolver: zodResolver(joinGroupSchema as any),
    values: {
      joinCode: "",
    },
  });

  async function handleJoinGroupFormSubmit(data: JoinGroupFormValues) {
    setServerError(null);
    try{
      const res = await authFetch(`/api/v1/group/join/${data.joinCode}`, null, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      })

      const json = await res.json()
      if(!res.ok){
        setServerError(json.message ?? "Error while joingin group")
      }
    }catch{
      setServerError("Something went wrong. Please try again")
    }
  }

  if(!user){
    return null
  }

  return (
    <div>
      <Card className="overflow-hidden border-slate-200/80 shadow-lg">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 7-6.5 6.5a1.5 1.5 0 0 0 3 3L18 10"/><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V5a1 1 0 0 0 1 1h.5A2.5 2.5 0 0 1 16 8.5a.5.5 0 0 1-.5.5H15a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h0a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5a2.5 2.5 0 0 1 2.5-2.5H7a1 1 0 0 0 1-1v-.5A2.5 2.5 0 0 1 10.5 9h.5a1 1 0 0 0 1-1V7.5A2.5 2.5 0 0 1 14.5 5H15a1 1 0 0 0 1-1V2.5A.5.5 0 0 0 15.5 2z"/></svg>
            </div>
            <CardTitle className="text-base font-bold">Join Group</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          {serverError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              {serverError}
            </div>
          )}
          <form onSubmit={form.handleSubmit(handleJoinGroupFormSubmit)} className="space-y-4">
            <Controller
              name="joinCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-600">8-Digit Code</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. AB12CD34"
                    className="h-10 rounded-xl border-slate-200 font-mono tracking-widest text-sm uppercase focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </Field>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-[#0c5443] py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#094738]"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Joining…" : "Join Group"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
