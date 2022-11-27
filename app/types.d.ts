type CodeExecutionResult = {
    success: boolean;
    timestamp: number;
    language: string;
    version?: string;
    output?: string;
    error?: string;
};
