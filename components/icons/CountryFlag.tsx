export function CountryFlag({ country }: { country: string }) {
	return (
		<span
			className="inline-block h-5 w-8 rounded-[2px] text-2xl leading-none"
			style={{ fontFamily: "'Twemoji Country Flags', sans-serif" }}
		>
			{country
				.toUpperCase()
				.split("")
				.map((char) => String.fromCodePoint(127_397 + char.charCodeAt(0)))
				.join("")}
		</span>
	);
}
