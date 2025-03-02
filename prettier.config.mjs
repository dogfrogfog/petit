const prettierConfig = {
	plugins: ["prettier-plugin-tailwindcss"],
	semi: true,
	tabWidth: 2,
	printWidth: 120,
	trailingComma: "all",

	/** Settings provided by prettier-plugin-tailwindcss */ 
	tailwindAttributes: ["titleClassName"],
	tailwindFunctions: ["cn", "cva"],
};

export default prettierConfig;