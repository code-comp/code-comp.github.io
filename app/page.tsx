"use client";

import { useCallback, useState } from "react";
import Editor from "./components/editor/editor";
import Output from "./components/output/output";
import styles from "./page.module.css";

export default function Home() {
	const [result, setResult] = useState({} as CodeExecutionResult);
	const onCodeExecuted = useCallback((result: CodeExecutionResult) => setResult(result), []);
	return (
		<Panels>
			<Editor onCodeExecuted={onCodeExecuted} />
			<Output result={result} />
		</Panels>
	);
}

function Panels({ children }: { children: React.ReactNode }) {
	return <div className={styles.panels}>{children}</div>;
}
