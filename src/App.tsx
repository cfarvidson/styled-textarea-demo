import { useState, useRef, useMemo } from "react";
import ContentEditable from "react-contenteditable";

import "./App.css";
import { convertTextToHtml, convertToText, validateHtml } from "./utils";

const DEFAULT_VALUE = "<p>foo good<p><p>bar bad</p>";

function App() {
  const [htmlContent, setHtmlContent] = useState(DEFAULT_VALUE);
  const ref = useRef<HTMLDivElement | null>(null);

  const text = useMemo(() => {
    return convertToText(htmlContent);
  }, [htmlContent]);

  return (
    <div className="h-screen w-screen flex justify-center p-10 flex gap-2">
      <div>
        <h2>Editable:</h2>
        <div className="relative bg-transparent w-64  text-left rounded border border-2">
          <ContentEditable
            className="absolute w-full h-full p-2"
            innerRef={ref}
            html={htmlContent}
            onPaste={(e) => {
              e.preventDefault();
              const pastedText = e.clipboardData.getData("text/plain");
              const html = convertTextToHtml(pastedText);
              if (html) {
                setHtmlContent(html);
              }
            }}
            disabled={false}
            onChange={(e) => {
              setHtmlContent(e.target.value);
            }}
            tagName="div"
          />
          <div
            className="bg-white w-full h-full p-2 text-transparent"
            dangerouslySetInnerHTML={{ __html: validateHtml(htmlContent) }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <h2>Text content:</h2>
        <pre className="text-xs bg-gray-50 p-2 rounded w-64">{text}</pre>
      </div>
    </div>
  );
}

export default App;
