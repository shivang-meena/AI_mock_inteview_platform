"use client";

import { useEffect, useState, DependencyList } from "react";

interface ApiDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApiData<T>(
  fetchFn: () => Promise<T>,
  deps: DependencyList,
  enabled: boolean = true
): ApiDataState<T> {
  const [state, setState] = useState<ApiDataState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetchFn()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) {
            console.log(err);
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled]);

  return state;
}