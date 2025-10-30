"use client";

import { Databuddy } from "@databuddy/sdk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1 minute
					},
				},
			})
	);

	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Databuddy
						clientId="Rq4dPbvZAERml1kx_3PJt"
						trackErrors
						trackWebVitals
					/>
					{children}
				</ThemeProvider>
			</QueryClientProvider>
		</NuqsAdapter>
	);
}
