import styles from "./header.module.css";
import Image from "next/image";
import logo from "/assets/logo.svg";

export default function Header() {
	return (
		<header className={styles.header}>
			<nav className={styles.pages}>
				<ul>
					<li data-page="home">
						<a href="/" className="icon">
							<Image src={logo} role="presentation" className={styles.logo} alt="Logo" />
							Home
						</a>
					</li>
					<li data-page="about">
						<a href="/about">About</a>
					</li>
					<li data-page="pricing">
						<a href="/pricing">Pricing</a>
					</li>
				</ul>
			</nav>
			<nav className={styles.pages}>
				<ul>
					<li data-page="login">
						<a href="/login">Log In</a>
					</li>
					<li data-page="register">
						<a href="/register">Register</a>
					</li>
					<li data-page="profile">
						<a href="/profile" className={styles.icon}>
							<Image alt="profile" src="" />
							Profile
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
