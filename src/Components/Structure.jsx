import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { FiCopy, FiPrinter, FiDroplet } from "react-icons/fi";
import "../Styles/Structure.css";

const Structure = () => {
    const editorRef = useRef(null);

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(14);
    const [fontFamily, setFontFamily] = useState(
        "'JetBrains Mono', monospace"
    );

    const languages = [
        { label: "JavaScript", value: "javascript" },
        { label: "TypeScript", value: "typescript" },
        { label: "Python", value: "python" },
        { label: "Java", value: "java" },
        { label: "C", value: "c" },
        { label: "C++", value: "cpp" },
        { label: "C#", value: "csharp" },
        { label: "HTML", value: "html" },
        { label: "CSS", value: "css" },
        { label: "PHP", value: "php" },
        { label: "JSON", value: "json" },
        { label: "SQL", value: "sql" },
        { label: "XML", value: "xml" },
        { label: "Markdown", value: "markdown" },
        { label: "Shell", value: "shell" },
        { label: "Go", value: "go" },
        { label: "Rust", value: "rust" },
        { label: "Ruby", value: "ruby" },
        { label: "Kotlin", value: "kotlin" },
        { label: "Swift", value: "swift" }
    ];

    const escapeHtml = (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleCopy = async () => {
        const code = editorRef.current?.getValue() || "";

        try {
            await navigator.clipboard.writeText(code);
            alert("Code copied!");
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    const handlePrint = () => {
        const code = editorRef.current?.getValue() || "";
        const printWindow = window.open("", "_blank");

        if (!printWindow) {
            alert("Please allow pop-ups to print your code.");
            return;
        }

        const safeTitle = escapeHtml(title.trim() || "SnapCode");
        const safeCode = escapeHtml(code);

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${safeTitle}</title>

                <style>
                    @page {
                        size: A4 portrait;
                        margin: 10mm;
                    }

                    * {
                        box-sizing: border-box;
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                        background: white;
                        color: #111;
                    }

                    body {
                        font-family: ${JSON.stringify(fontFamily)};
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    h2 {
                        font-family: Arial, sans-serif;
                        font-size: 14pt;
                        margin: 0 0 5mm;
                        padding-bottom: 3mm;
                        border-bottom: 1px solid #ddd;
                    }

                    pre {
                        margin: 0;
                        padding: 0;
                        font-family: ${JSON.stringify(fontFamily)};
                        font-size: ${fontSize}pt;
                        line-height: 1.3;
                        font-weight: normal;
                        white-space: pre-wrap;
                        overflow-wrap: anywhere;
                        word-break: normal;
                        tab-size: 4;
                        break-inside: auto;
                        page-break-inside: auto;
                    }

                    @media print {
                        body {
                            margin: 0;
                        }

                        pre {
                            orphans: 2;
                            widows: 2;
                        }
                    }
                </style>
            </head>

            <body>
                <h2>${safeTitle}</h2>
                <pre>${safeCode}</pre>
            </body>
            </html>
        `);

        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
        };
    };

    return (
        <div className="structure-wrapper">
            <div className="main-carbon">

                <header className="toolbar">

                    <div className="toolbar-left">
                        <input
                            className="title-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="SnapCode Title"
                            maxLength={40}
                        />
                    </div>

                    <div className="toolbar-right">

                        <select
                            className="tool-select"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            {languages.map((lang) => (
                                <option
                                    key={lang.value}
                                    value={lang.value}
                                >
                                    {lang.label}
                                </option>
                            ))}
                        </select>

                        <select
                            className="tool-select"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="vs-dark">Dark</option>
                            <option value="vs">Light</option>
                            <option value="hc-black">High Contrast</option>
                        </select>

                        <select
                            className="tool-select"
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                        >
                            <option value="'JetBrains Mono', monospace">
                                JetBrains Mono
                            </option>
                            <option value="'Fira Code', monospace">
                                Fira Code
                            </option>
                            <option value="'Consolas', monospace">
                                Consolas
                            </option>
                            <option value="'Courier New', monospace">
                                Courier New
                            </option>
                            <option value="monospace">
                                Monospace
                            </option>
                        </select>

                        <select
                            className="tool-select"
                            value={fontSize}
                            onChange={(e) =>
                                setFontSize(Number(e.target.value))
                            }
                        >
                            {[10, 12, 13, 14, 16, 18, 20, 22].map(
                                (size) => (
                                    <option key={size} value={size}>
                                        {size}px
                                    </option>
                                )
                            )}
                        </select>

                        <button
                            className="tool-btn"
                            onClick={handleCopy}
                        >
                            <FiCopy />
                            Copy
                        </button>

                        <button
                            className="tool-btn primary"
                            onClick={handlePrint}
                        >
                            <FiPrinter />
                            Print A4
                        </button>

                    </div>
                </header>

                <div className="preview-wrapper">
                    <div className="preview-card">

                        <div className="window-bar">
                            <span className="red"></span>
                            <span className="yellow"></span>
                            <span className="green"></span>

                            <div className="filename">
                                {title || "snapCode"}
                            </div>
                        </div>

                        <div className="editor-container">
                            <Editor
                                height="650px"
                                language={language}
                                theme={theme}
                                onMount={handleEditorDidMount}
                                options={{
                                    fontSize: fontSize,
                                    fontFamily: fontFamily,
                                    minimap: {
                                        enabled: false
                                    },
                                    lineNumbers: "on",
                                    automaticLayout: true,
                                    wordWrap: "on",
                                    scrollBeyondLastLine: false,
                                    tabSize: 4,
                                    insertSpaces: true,
                                    autoIndent: "full",
                                    formatOnPaste: true,
                                    formatOnType: true,
                                    suggestOnTriggerCharacters: true,
                                    quickSuggestions: true,
                                    padding: {
                                        top: 15,
                                        bottom: 15
                                    }
                                }}
                                defaultValue=""
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Structure;
