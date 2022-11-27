import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { languages } from "../../constants";
import Score from "../score/score";
import styles from "./output.module.scss";
config.autoAddCss = false;

export default function Output({ result }: { result: CodeExecutionResult }) {
	return (
		<div
			className={[
				styles.output,
				result.success != null ? (result.success ? styles.success : styles.error) : "",
			].join(" ")}
		>
			<Score />
			{(result.output || result.error) && (
				<code className={styles.output}>
					{result.output}
					{result.error}
				</code>
			)}
			{(result.language || result.version) && (
				<div className={styles.language}>
					{languages.get(result.language)?.title} {result.version}
				</div>
			)}
			{result.success != null ? (
				<div className={styles.status} title={result.success ? "Success" : "Error"}>
					{result.success ? (
						<>
							<FontAwesomeIcon icon={faCheck} />
							<span> Success</span>
						</>
					) : (
						<>
							<FontAwesomeIcon icon={faTimes} />
							<span> Error</span>
						</>
					)}
				</div>
			) : null}
		</div>
	);
}
