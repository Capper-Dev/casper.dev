import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "casper.dev - Casper Truberg's portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		<div
			style={{
				background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: "sans-serif",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			<div
				style={{
					fontSize: 96,
					fontWeight: 700,
					background: "linear-gradient(180deg, #ffffff 0%, #a3a3a3 100%)",
					backgroundClip: "text",
					color: "transparent",
					letterSpacing: "-2px",
					lineHeight: 1,
					marginBottom: 24,
				}}
			>
				Casper
			</div>

			<div
				style={{
					fontSize: 28,
					color: "#737373",
					letterSpacing: "0.05em",
					textTransform: "uppercase",
				}}
			>
				Self-Taught Developer
			</div>

			<div
				style={{
					marginTop: 48,
					fontSize: 22,
					color: "#404040",
					letterSpacing: "0.1em",
				}}
			>
				casper.dev
			</div>
		</div>,
		{ ...size },
	);
}
