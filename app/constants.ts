import type { LanguageSupport } from "@codemirror/language";

type Language = {
    name: string;
    title: string;
    editor?: () => LanguageSupport;
};

export const languages = new Map<string, Language>([
    ["java", {
        name: "java",
        title: "Java"
    }],
    ["py", {
        name: "py",
        title: "Python"
    }],
    ["cpp", {
        name: "cpp",
        title: "C++"
    }],
    ["c", {
        name: "c",
        title: "C"
    }],
    ["go", {
        name: "go",
        title: "GoLang"
    }],
    ["cs", {
        name: "cs",
        title: "C#"
    }],
    ["js", {
        name: "js",
        title: "NodeJS"
    }],
]);
