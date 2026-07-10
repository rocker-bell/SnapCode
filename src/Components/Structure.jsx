import { useRef, useState } from "react";
import { FiImage, FiDroplet, FiCopy, FiPrinter } from "react-icons/fi";
import "../Styles/Structure.css";

const Structure = () => {
    const textRef = useRef(null);
    const [title, setTitle] = useState("");
    const escapeHtml = (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    };

    const handlePrint = () => {
        const code = textRef.current.value;

        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>SnapCode - Print</title>

                    <style>
                        *{
                            box-sizing:border-box;
                        }

                        body{
                            margin:30px;
                            font-family:"JetBrains Mono", monospace;
                            background:white;
                            color:black;
                        }

                        h2{
                            margin-bottom:20px;
                            border-bottom:2px solid #ddd;
                            padding-bottom:10px;
                        }

                        pre{
                            white-space:pre-wrap;
                            word-break:break-word;
                            font-size:14px;
                            line-height:1.7;
                            margin:0;
                        }

                        @page{
                            margin:20mm;
                        }
                    </style>
                </head>

                <body>

                    <h2>${title.trim() || "SnapCode"}</h2>

                    <pre>${escapeHtml(code)}</pre>

                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    const handleCopy = async () => {
    const code = textRef.current.value;

    try {
        await navigator.clipboard.writeText(code);
        alert("Code copied!");
    } catch (error) {
        console.error("Copy failed:", error);
    }
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

                        {/* <button className="tool-btn">
                            <FiImage />
                            Background
                        </button>

                        <button className="tool-btn">
                            <FiDroplet />
                            Theme
                        </button> */}

                        <button 
                        className="tool-btn"
                        onClick = {handleCopy}
                        >
                            <FiCopy />
                            Copy
                        </button>

                        <button
                            className="tool-btn primary"
                            onClick={handlePrint}
                        >
                            <FiPrinter />
                            Print
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
                                snapCode
                            </div>
                        </div>

                        <textarea
                            ref={textRef}
                            className="printable-textsection"
                            spellCheck={false}
                            placeholder="// Start typing your code..."
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Structure;