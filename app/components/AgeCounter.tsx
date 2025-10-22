"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BIRTH_DATE = new Date("2005-08-16T00:00:00").getTime();
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function AgeCounter() {
	const [age, setAge] = useState(0);
	const frameRef = useRef<number>(0);

	useEffect(() => {
		const updateAge = () => {
			const now = Date.now();
			const years = (now - BIRTH_DATE) / MS_PER_YEAR;
			setAge(years);
			frameRef.current = requestAnimationFrame(updateAge);
		};

		frameRef.current = requestAnimationFrame(updateAge);

		return () => {
			if (frameRef.current !== 0) {
				cancelAnimationFrame(frameRef.current);
			}
		};
	}, []);

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="rounded border border-border p-6"
			initial={{ opacity: 0, y: 20 }}
		>
			<h3 className="mb-4 font-semibold text-xl">Age</h3>
			<div className="font-mono text-2xl text-foreground">
				{age.toFixed(9)} years old
			</div>
			<p className="mt-2 text-muted-foreground text-sm">
				Born August 16th, 2005
			</p>
		</motion.div>
	);
}
