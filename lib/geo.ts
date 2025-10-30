import { useQuery } from "@tanstack/react-query";

const countriesGeoUrl = "/data/countries.json";

const subdivisionsGeoUrl = "/data/subdivisions.json";

export type Subdivisions = {
	type: string;
	features: {
		type: string;
		properties: {
			name: string;
			iso_3166_2: string;
			admin: string;
			border: number;
		};
		geometry: {
			type: string;
			coordinates: unknown[][][];
		};
	}[];
};

export type Country = {
	type: string;
	features: {
		type: string;
		properties: {
			ISO_A2: string;
			ADMIN: string;
			ISO_A3: string;
			BORDER: number;
		};
		geometry: {
			type: string;
			coordinates: unknown[][][];
		};
	}[];
};

export const useSubdivisions = () =>
	useQuery<Subdivisions>({
		queryKey: ["subdivisions"],
		queryFn: () => fetch(subdivisionsGeoUrl).then((res) => res.json()),
	});

export const useCountries = () =>
	useQuery<Country>({
		queryKey: ["countries"],
		queryFn: () => fetch(countriesGeoUrl).then((res) => res.json()),
	});

export const useGetRegionName = () => {
	const { data: subdivisions } = useSubdivisions();
	return {
		getRegionName: (region: string) =>
			subdivisions?.features.find(
				(feature) => feature.properties.iso_3166_2 === region
			)?.properties.name,
	};
};
