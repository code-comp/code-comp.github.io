import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import "./globals.scss";
import styles from "./layout.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Code Comp</title>
				<meta name="description" content="Code Comp website" />
				<link rel="shortcut icon" href="/assets/logo.svg" />
			</head>
			<body>
				<Header />
				<main className={styles.main}>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
