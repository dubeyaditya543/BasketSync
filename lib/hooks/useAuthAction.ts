"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCallback } from "react";

export function useAuthAction() {
  const { accessToken, refreshAuth } = useAuth();

  const run = useCallback(
    async <TArgs extends unknown[], TResult extends { success: boolean; error?: string }>(
      action: (token: string | null, ...args: TArgs) => Promise<TResult>,
      ...args: TArgs
    ): Promise<TResult> => {
      const result = await action(accessToken, ...args);

      if (!result.success && result.error?.toLowerCase().includes("expired")) {
        const newToken = await refreshAuth();
        if (!newToken) {
          return { ...result, error: "Session expired. Please log in again." };
        }
        return action(newToken, ...args);
      }
      return result;
    },
    [accessToken, refreshAuth],
  );
  return run;
}
