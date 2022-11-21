/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["**/*.html"],
	theme: {
		extend: {
			colors: {
				dark: "var(--color-dark)",
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				tertiary: "var(--color-tertiary)",
				background: "var(--color-background)",
				header: "var(--color-header)",
				"header-hover": "var(--color-header-hover)",
				error: "var(--color-error)",
			},
		},
	},
	plugins: [],
};
