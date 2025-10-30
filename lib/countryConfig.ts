type CountryStatus = "visited" | "want-to-go" | "never-went" | null;

type CountryStates = {
	[countryCode: string]: CountryStatus;
};

export const countryConfig: CountryStates = {
	PS: "visited",
	JO: "visited",

	// Wanna visit:
	AE: "want-to-go",
	US: "want-to-go",
	CA: "want-to-go",
	JP: "want-to-go",
	KR: "want-to-go",
	CN: "want-to-go",
	DE: "want-to-go",
	FR: "want-to-go",
	IT: "want-to-go",
	ES: "want-to-go",
	NL: "want-to-go",
	BE: "want-to-go",
	CH: "want-to-go",
	AT: "want-to-go",
	SE: "want-to-go",
	UK: "want-to-go",
	AU: "want-to-go",
	SG: "want-to-go",
	HK: "want-to-go",
	KZ: "want-to-go",
	RU: "want-to-go",
	GR: "want-to-go",
	FI: "want-to-go",
	NO: "want-to-go",
	DK: "want-to-go",
	IE: "want-to-go",
	PT: "want-to-go",
	GB: "want-to-go",
	ID: "want-to-go",
	MY: "want-to-go",
	LB: "want-to-go",
	CY: "want-to-go",
	TR: "want-to-go",
};
