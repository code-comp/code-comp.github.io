import styles from "./footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				Copyright &copy; 2022 Code Comp. Designed by <strong>Group 11</strong> for the SEG 2900 course at
				uOttawa.
			</p>
			<a href="/terms-privacy">Terms of Service & Privacy Policy</a>
		</footer>
	);
}
