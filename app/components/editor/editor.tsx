import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styles from "./editor.module.css";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";

import { languages } from "../../constants";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Editor({ onCodeExecuted }: { onCodeExecuted: (result: CodeExecutionResult) => void }) {
	"use client";

	const [language, setLanguage] = useState("py");
	const changeLanguage = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => setLanguage(event.target.value),
		[language],
	);

	const [content, setContent] = useState("");
	const onEdit = useCallback((value: string) => setContent(value), []);
	const onSubmit = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();
			const result = await executeCode(content);
			console.log(result);
			onCodeExecuted(result);
		},
		[content, onCodeExecuted],
	);
	const [loading, setLoading] = useState(true);

	return (
		<form className={styles.container} onSubmit={onSubmit}>
			<select className={styles.language} value={language} onChange={changeLanguage}>
				{[...languages].map(([k, v]) => {
					return (
						<option key={k} value={k}>
							{v}
						</option>
					);
				})}
			</select>
			<CodeMirror
				className={styles.editor}
				height="100%"
				width="100%"
				theme="dark"
				value={content}
				autoFocus={true}
				placeholder={`Write your ${languages.get(language)} code here...`}
				extensions={[python(), EditorView.lineWrapping, oneDark]}
				onChange={onEdit}
				onCreateEditor={() => setLoading(false)}
			/>
			{loading ? (
				<div className={styles.loading}>
					<FontAwesomeIcon icon={faSpinner} />
				</div>
			) : null}
			<button className={styles.submit}>Let&apos;s go</button>
		</form>
	);
}

async function executeCode(code: string, language: string = "py", input: string = ""): Promise<CodeExecutionResult> {
	try {
		const response = await fetch("https://codex-api.herokuapp.com/", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				code,
				language,
				input,
			}),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				timestamp: Date.now(),
				error: error.message,
				language,
			};
		}
		return {
			success: false,
			timestamp: Date.now(),
			error: "Unknown error",
			language,
		};
	}
}
