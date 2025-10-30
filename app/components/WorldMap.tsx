"use client";

import type { Feature, GeoJsonObject } from "geojson";
import type { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";
import { useEffect, useRef, useState } from "react";

// Import react-leaflet components directly without dynamic imports
import { GeoJSON, MapContainer } from "react-leaflet";
import { CountryFlag } from "@/components/icons/CountryFlag";
import { countryConfig } from "@/lib/countryConfig";
import { useCountries } from "@/lib/geo";

type TooltipContent = {
	name: string;

	code: string;
};

type TooltipPosition = {
	x: number;

	y: number;
};

export function WorldMap({
	height = "600px",
	visitedCountries = [],
	isLoading: passedIsLoading = false,
}: {
	height?: string;
	visitedCountries?: string[];
	isLoading?: boolean;
} = {}) {
	const [isMounted, setIsMounted] = useState(false);
	const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(
		null
	);
	const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
		x: 0,
		y: 0,
	});
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const { data: countriesGeoData, isLoading, error } = useCountries();
	const mapRef = useRef<LeafletMap | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [resolvedHeight, setResolvedHeight] = useState<number>(0);

	// Ensure we're on the client side
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Force re-render when data loads
	useEffect(() => {
		if (countriesGeoData && mapRef.current) {
			mapRef.current.invalidateSize();
		}
	}, [countriesGeoData]);

	useEffect(() => {
		const updateHeight = () => {
			if (containerRef.current) {
				setResolvedHeight(containerRef.current.clientHeight);
			}
		};

		updateHeight();
		window.addEventListener("resize", updateHeight);
		return () => window.removeEventListener("resize", updateHeight);
	}, []);

	const zoom = resolvedHeight ? Math.log2(resolvedHeight / 400) + 1 : 1;

	// Don't render until mounted on client
	if (!isMounted) {
		return (
			<div
				className="flex h-full items-center justify-center rounded bg-muted/20"
				style={{ height }}
			>
				<div className="flex flex-col items-center gap-3">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent dark:border-blue-400" />
					<span className="font-medium text-gray-700 text-sm dark:text-gray-300">
						Loading map...
					</span>
				</div>
			</div>
		);
	}

	const getCountryStatus = (code: string) => {
		if (visitedCountries.includes(code)) {
			return "visited";
		}
		return countryConfig[code] || null;
	};

	type ColorSet = {
		border: string;
		fill: string;
	};

	const getVisitedColors = (isHovered: boolean, isDark: boolean): ColorSet => {
		if (isDark) {
			return {
				border: isHovered ? "rgba(59, 130, 246, 1)" : "rgba(59, 130, 246, 0.4)",
				fill: isHovered ? "#3b82f6" : "#2563eb",
			};
		}
		return {
			border: isHovered ? "rgba(59, 130, 246, 1)" : "rgba(59, 130, 246, 0.5)",
			fill: isHovered ? "#60a5fa" : "#3b82f6",
		};
	};

	const getWantToGoColors = (isDark: boolean): ColorSet => ({
		border: isDark ? "rgba(168, 85, 247, 0.4)" : "rgba(168, 85, 247, 0.5)",
		fill: isDark ? "#7c3aed" : "#a855f7",
	});

	const getNeverWentColors = (isDark: boolean): ColorSet => ({
		border: isDark ? "rgba(239, 68, 68, 0.4)" : "rgba(239, 68, 68, 0.5)",
		fill: isDark ? "#dc2626" : "#ef4444",
	});

	const getUnvisitedColors = (isDark: boolean): ColorSet => ({
		border: isDark ? "rgba(55, 65, 81, 0.3)" : "rgba(229, 231, 235, 0.5)",
		fill: isDark ? "#1f2937" : "#f3f4f6",
	});

	const getColorForStatus = (
		status: string | null,
		isHovered: boolean,
		isDark: boolean
	): ColorSet => {
		if (status === "visited") {
			return getVisitedColors(isHovered, isDark);
		}
		if (status === "want-to-go") {
			return getWantToGoColors(isDark);
		}
		if (status === "never-went") {
			return getNeverWentColors(isDark);
		}
		return getUnvisitedColors(isDark);
	};

	const getDefaultStyle = (isDark: boolean) => ({
		color: isDark ? "rgba(55, 65, 81, 0.3)" : "rgba(229, 231, 235, 0.5)",
		weight: 0.5,
		fill: true,
		fillColor: isDark ? "#1f2937" : "#f3f4f6",
		fillOpacity: 0.5,
		opacity: 0.8,
	});

	const handleStyle = (feature?: Feature) => {
		const isDark = document.documentElement.classList.contains("dark");

		if (!feature?.properties) {
			return getDefaultStyle(isDark);
		}

		const countryCode = feature.properties.ISO_A2;
		const status = countryCode ? getCountryStatus(countryCode) : null;
		const isHovered = hoveredId === countryCode;
		const currentColors = getColorForStatus(status, isHovered, isDark);
		const hasStatus = status !== null;

		return {
			color: currentColors.border,
			weight: hasStatus ? (isHovered ? 2 : 1) : 0.5,
			fill: true,
			fillColor: currentColors.fill,
			fillOpacity: isHovered ? 0.9 : 0.7,
			opacity: 1,
		};
	};

	const handleEachFeature = (feature: Feature, layer: Layer) => {
		const countryCode = feature.properties?.ISO_A2;

		layer.on({
			mouseover: () => {
				setHoveredId(countryCode);
				const name = feature.properties?.ADMIN;
				setTooltipContent({
					name,
					code: countryCode,
				});
			},
			mouseout: () => {
				setHoveredId(null);
				setTooltipContent(null);
			},
		});
	};

	if (isLoading || passedIsLoading) {
		return (
			<div
				className="flex h-full items-center justify-center rounded bg-muted/20"
				style={{ height }}
			>
				<div className="flex flex-col items-center gap-3">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent dark:border-blue-400" />
					<span className="font-medium text-gray-700 text-sm dark:text-gray-300">
						Loading map...
					</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div
				className="flex h-full items-center justify-center rounded bg-red-50 dark:bg-red-900/20"
				style={{ height }}
			>
				<div className="text-center">
					<p className="text-red-600 dark:text-red-400">
						Failed to load map data
					</p>
					<p className="mt-1 text-red-500 text-sm dark:text-red-300">
						{error instanceof Error ? error.message : "Unknown error"}
					</p>
				</div>
			</div>
		);
	}

	if (!countriesGeoData) {
		return (
			<div
				className="flex h-full items-center justify-center rounded bg-gray-50 dark:bg-gray-900/20"
				style={{ height }}
			>
				<p className="text-gray-600 dark:text-gray-400">
					No map data available
				</p>
			</div>
		);
	}

	return (
		<>
			<section
				aria-label="World map"
				className="relative overflow-hidden rounded-xl border border-border bg-background shadow-sm"
				ref={containerRef}
				style={{
					height,
				}}
			>
				<div
					onKeyDown={(e) => {
						if (tooltipContent && (e.key === "Escape" || e.key === "Enter")) {
							setTooltipContent(null);
						}
					}}
					onMouseMove={(e) => {
						if (tooltipContent) {
							setTooltipPosition({
								x: e.clientX,
								y: e.clientY,
							});
						}
					}}
					role="tablist"
					style={{ height: "100%", width: "100%" }}
				>
					<MapContainer
						attributionControl={false}
						center={[20, 0]}
						preferCanvas={true}
						ref={mapRef}
						style={{
							height: "100%",
							width: "100%",
							background: "transparent",
							cursor: "grab",
							outline: "none",
						}}
						zoom={zoom}
						zoomControl={true}
					>
						<GeoJSON
							data={countriesGeoData as GeoJsonObject}
							onEachFeature={handleEachFeature}
							style={handleStyle}
						/>
					</MapContainer>
				</div>
			</section>

			{tooltipContent && (
				<div
					className="pointer-events-none fixed z-9999 rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm shadow-xl"
					style={{
						left: tooltipPosition.x,
						top: tooltipPosition.y - 10,
						transform: "translate(-50%, -100%)",
					}}
				>
					<div className="flex items-center gap-2 font-medium">
						{tooltipContent.code && (
							<CountryFlag country={tooltipContent.code} />
						)}
						<span>{tooltipContent.name}</span>
					</div>
				</div>
			)}
		</>
	);
}
