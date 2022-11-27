"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styles from "./editor.module.css";

import { yCollab } from "y-codemirror.next";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { languages } from "../../constants";

languages.forEach(language => {
	if (language.name === "js") {
		language.editor = javascript;
	} else if (language.name === "py") {
		language.editor = python;
	}
});

const yDoc = new Y.Doc();
// @ts-expect-error
const provider = new WebrtcProvider("code-comp", yDoc, {
	signaling: ["ws://localhost:1234"],
});

const hue = Math.floor(Math.random() * 360);
provider.awareness.setLocalStateField("user", {
	name: "Anonymous " + Math.floor(Math.random() * 100),
	color: `hsl(${hue}, 70%, 30%)`,
	colorLight: `hsl(${hue}, 70%, 90%)`,
});

export default function Editor({ onCodeExecuted }: { onCodeExecuted: (result: CodeExecutionResult) => void }) {
	const [language, setLanguage] = useState("py");
	provider.awareness.setLocalStateField("language", language);
	const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
		provider.awareness.setLocalStateField("language", event.target.value);
	};
	// Keep language in sync with other users
	provider.awareness.on("change", (event: any) => {
		const { added, updated } = event;
		console.log(`Added ${added.length} users, updated ${updated.length} users`);
		const states = provider.awareness.getStates();
		[...added, ...updated]
			.filter((client: any) => client !== provider.awareness.clientID)
			.forEach((client: any) => {
				console.log("client", states.get(client));
				setLanguage(states.get(client)!.language);
			});
	});

	const yText = yDoc.getText("codemirror");
	const undoManager = new Y.UndoManager(yText);

	const onSubmit = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();
			const result = await executeCode(yText.toString(), language);
			console.log(result);
			onCodeExecuted(result);
		},
		[language, onCodeExecuted, yText],
	);
	const [loading, setLoading] = useState(true);

	return (
		<form className={styles.container} onSubmit={onSubmit}>
			<select className={styles.language} value={language} onChange={changeLanguage}>
				{[...languages].map(([k, v]) => {
					return (
						<option key={k} value={k} disabled={!v.editor}>
							{v.title}
						</option>
					);
				})}
			</select>
			{languages.get(language)?.editor ? (
				<CodeMirror
					className={styles.editor}
					height="100%"
					width="100%"
					theme="dark"
					value={yText.toString()}
					autoFocus={true}
					extensions={[
						languages.get(language)!.editor!(),
						EditorView.lineWrapping,
						oneDark,
						yCollab(yText, provider.awareness, { undoManager }),
					]}
					onCreateEditor={() => setLoading(false)}
				/>
			) : null}
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
