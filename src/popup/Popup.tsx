/** @jsx jsx */

import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/beagle.min.css";
import React, { useRef } from "react";
import { jsx, css } from "@emotion/react";
import { getData, setData } from "./utils/storage";
import MediumEditor from "medium-editor";

const NOTES = "DATA_NOTES";

const Popup = () => {
  const editorRef = useRef<typeof MediumEditor>();

  React.useEffect(() => {
    getData(NOTES, (data) => {
      editorRef.current.setContent(data);
    });

    function onEditInput(event: any) {
      setData(NOTES, event.target.innerHTML);
    }

    if (editorRef.current) {
      editorRef.current.subscribe("editableInput", onEditInput);
    }

    return () => {
      editorRef.current.unsubscribe("editableInput", onEditInput);
    };
  }, [editorRef]);

  const handleRef = (ref: HTMLElement) => {
    if (ref) {
      editorRef.current = new MediumEditor(ref, {
        placeholder: {
          text: "Type your text",
          hideOnClick: false,
        },
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: ["bold", "italic", "underline", "h1", "h2"],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: "medium-editor-button-first",
          lastButtonClass: "medium-editor-button-last",
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          align: "center",
          updateOnEmptySelection: false,
        },
      });
    }
  };

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <span>Random-notes</span>
        <img src="settings.svg" height={18} width={18} />
      </div>
      <div css={styles.mediumEditor} ref={(ref) => handleRef(ref)} />
    </div>
  );
};

const styles = {
  header: css({
    display: "flex",
    justifyContent: "space-between",
    height: 18,
    padding: "2px 5px",
    backgroundColor: "black",
    fontWeight: "bold",
    color: "white",
  }),
  container: css({
    height: 200,
    width: 300,
  }),
  mediumEditor: css({
    padding: 8,
    maxHeight: 200,
    height: "100%",
    width: "auto",
    overflowX: "auto",
    outline: 0,
    p: {
      margin: 2,
    },
  }),
};

export default Popup;
