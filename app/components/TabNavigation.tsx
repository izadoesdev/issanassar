"use client";

import { motion } from "framer-motion";

type Tab = "portfolio" | "about" | "map";

type TabNavigationProps = {
	activeTab: Tab;
	onTabChange: (tab: Tab) => void;
};

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="-translate-x-1/2 fixed top-6 left-1/2 z-50"
			initial={{ opacity: 0, y: -20 }}
		>
			<div className="flex gap-2 rounded border border-border bg-background/80 p-1 backdrop-blur-sm">
				<button
					className={`rounded px-4 py-2 text-sm transition-all ${
						activeTab === "portfolio"
							? "bg-foreground text-background"
							: "text-muted-foreground hover:text-foreground"
					}`}
					onClick={() => onTabChange("portfolio")}
					type="button"
				>
					Portfolio
				</button>
				<button
					className={`rounded px-4 py-2 text-sm transition-all ${
						activeTab === "about"
							? "bg-foreground text-background"
							: "text-muted-foreground hover:text-foreground"
					}`}
					onClick={() => onTabChange("about")}
					type="button"
				>
					About
				</button>
				<button
					className={`rounded px-4 py-2 text-sm transition-all ${
						activeTab === "map"
							? "bg-foreground text-background"
							: "text-muted-foreground hover:text-foreground"
					}`}
					onClick={() => onTabChange("map")}
					type="button"
				>
					Map
				</button>
			</div>
		</motion.div>
	);
}
