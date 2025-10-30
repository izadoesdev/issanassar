import { Suspense } from "react";
import { TabContent } from "./components/TabContent";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
				{/* Header with Theme Toggle */}
				<header className="mb-20 flex items-start justify-between pt-12">
					<div>
						<h1 className="mb-2 font-bold text-4xl tracking-tight md:text-5xl">
							Issa Nassar
						</h1>
						<p className="text-lg text-muted-foreground md:text-xl">
							Software Engineer, Founder
						</p>
					</div>
					<ThemeToggle />
				</header>

				<Suspense fallback={<div className="pt-12">Loading...</div>}>
					<TabContent />
				</Suspense>

				{/* Footer */}
				<footer className="mt-20 border-border border-t pt-8 text-center text-muted-foreground text-sm">
					<p>© {new Date().getFullYear()} Issa Nassar. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
}
