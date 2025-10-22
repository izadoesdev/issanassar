import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(_request: NextRequest) {
	try {
		return new ImageResponse(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					backgroundColor: "#0a0a0a",
					padding: "80px",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
					}}
				>
					<h1
						style={{
							fontSize: "80px",
							fontWeight: "700",
							letterSpacing: "-3px",
							color: "#ffffff",
							lineHeight: "1",
						}}
					>
						Issa Nassar
					</h1>
					<p
						style={{
							fontSize: "32px",
							color: "#888888",
							fontWeight: "400",
						}}
					>
						Software Engineer & Founder
					</p>
					<div
						style={{
							marginTop: "40px",
							display: "flex",
							flexDirection: "column",
							gap: "12px",
						}}
					>
						<div
							style={{
								fontSize: "24px",
								color: "#666666",
								maxWidth: "800px",
							}}
						>
							Building Databuddy and tools for developers.
						</div>
						<div
							style={{
								fontSize: "24px",
								color: "#666666",
								maxWidth: "800px",
							}}
						>
							Open source enthusiast focused on observability & infrastructure.
						</div>
					</div>
				</div>

				<div
					style={{
						position: "absolute",
						bottom: "80px",
						left: "80px",
						display: "flex",
						gap: "16px",
						fontSize: "18px",
						color: "#666666",
					}}
				>
					<span>Bun</span>
					<span>·</span>
					<span>Elysia</span>
					<span>·</span>
					<span>TypeScript</span>
					<span>·</span>
					<span>ClickHouse</span>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
			}
		);
	} catch {
		return new Response("Failed to generate the image", {
			status: 500,
		});
	}
}
