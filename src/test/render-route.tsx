import { QueryClient } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
  type AnyRoute,
} from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { routeTree } from "@/routeTree.gen";

/**
 * Mount the real application at a given URL so tests exercise routing,
 * the app shell and the page component together.
 */
export async function renderRoute(path: string) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const router = createRouter({
    routeTree: routeTree as unknown as AnyRoute,
    context: { queryClient },
    history: createMemoryHistory({ initialEntries: [path] }),
    defaultPreloadStaleTime: 0,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = render(<RouterProvider router={router as any} />);
  await waitFor(() => expect(router.state.status).toBe("idle"));
  return { ...result, router, queryClient };
}

export { screen, waitFor };
