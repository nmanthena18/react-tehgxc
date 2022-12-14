import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  EditorState,
  ContentState,
  Modifier,
  convertFromHTML,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import rtfToHTML from '@iarna/rtf-to-html';
import { stateToHTML } from 'draft-js-export-html';
function template(doc, defaults, content) {
  return content;
}

function convertHtmlToRtf(html) {
  if (!(typeof html === 'string' && html)) {
    return null;
  }

  var tmpRichText, hasHyperlinks;
  var richText = html;

  // Singleton tags
  richText = richText.replace(
    /<(?:hr)(?:\s+[^>]*)?\s*[\/]?>/gi,
    '{\\pard \\brdrb \\brdrs \\brdrw10 \\brsp20 \\par}\n{\\pard\\par}\n'
  );
  richText = richText.replace(
    /<(?:br)(?:\s+[^>]*)?\s*[\/]?>/gi,
    '{\\pard\\par}\n'
  );

  // Empty tags
  richText = richText.replace(
    /<(?:p|div|section|article)(?:\s+[^>]*)?\s*[\/]>/gi,
    '{\\pard\\par}\n'
  );
  richText = richText.replace(/<(?:[^>]+)\/>/g, '');

  // Hyperlinks
  richText = richText.replace(
    /<a(?:\s+[^>]*)?(?:\s+href=(["'])(?:javascript:void\(0?\);?|#|return false;?|void\(0?\);?|)\1)(?:\s+[^>]*)?>/gi,
    '{{{\n'
  );
  tmpRichText = richText;
  richText = richText.replace(
    /<a(?:\s+[^>]*)?(?:\s+href=(["'])(.+)\1)(?:\s+[^>]*)?>/gi,
    '{\\field{\\*\\fldinst{HYPERLINK\n "$2"\n}}{\\fldrslt{\\ul\\cf1\n'
  );
  hasHyperlinks = richText !== tmpRichText;
  richText = richText.replace(/<a(?:\s+[^>]*)?>/gi, '{{{\n');
  richText = richText.replace(/<\/a(?:\s+[^>]*)?>/gi, '\n}}}');

  // Start tags
  richText = richText.replace(/<(?:b|strong)(?:\s+[^>]*)?>/gi, '{\\b\n');
  richText = richText.replace(/<(?:i|em)(?:\s+[^>]*)?>/gi, '{\\i\n');
  richText = richText.replace(/<(?:u|ins)(?:\s+[^>]*)?>/gi, '{\\ul\n');
  richText = richText.replace(/<(?:strike|del)(?:\s+[^>]*)?>/gi, '{\\strike\n');
  richText = richText.replace(/<sup(?:\s+[^>]*)?>/gi, '{\\super\n');
  richText = richText.replace(/<sub(?:\s+[^>]*)?>/gi, '{\\sub\n');
  richText = richText.replace(
    /<(?:p|div|section|article)(?:\s+[^>]*)?>/gi,
    '{\\pard\n'
  );

  // End tags
  richText = richText.replace(
    /<\/(?:p|div|section|article)(?:\s+[^>]*)?>/gi,
    '\n\\par}\n'
  );
  richText = richText.replace(
    /<\/(?:b|strong|i|em|u|ins|strike|del|sup|sub)(?:\s+[^>]*)?>/gi,
    '\n}'
  );

  // Strip any other remaining HTML tags [but leave their contents]
  richText = richText.replace(/<(?:[^>]+)>/g, '');

  // Prefix and suffix the rich text with the necessary syntax
  richText =
    '{\\rtf1\\ansi\n' +
    (hasHyperlinks ? '{\\colortbl\n;\n\\red0\\green0\\blue255;\n}\n' : '') +
    richText +
    '\n}';

  return richText;
}

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  insertCharacter = (characterToInsert, editorState) => {
    const currentContent = editorState.getCurrentContent(),
      currentSelection = editorState.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      characterToInsert
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      'insert-characters'
    );
    let html = stateToHTML(newEditorState.getCurrentContent());
    console.log(html, '000');

    var htmlAsRtf = convertHtmlToRtf(html);
    console.log(htmlAsRtf);
    return newEditorState;
  };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log(editorState);
  };

  update = () => {
    const text =
      '{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0\\froman Tms Rmn;}{\\f1\\fswiss Arial;}}{\\colortbl\\red0\\green0\\blue0;\\red0\\green0\\blue255;\\red0\\green255\\blue255;\\red0\\green255\\blue0;\\red255\\green0\\blue255;\\red255\\green0\\blue0;\\red255\\green255\\blue0;\\red255\\green255\\blue255;\\red0\\green0\\blue127;\\red0\\green127\\blue127;\\red0\\green127\\blue0;\\red127\\green0\\blue127;\\red127\\green0\\blue0;\\red127\\green127\\blue0;\\red127\\green127\\blue127;\\red192\\green192\\blue192;}{\\info{\\creatim\\yr2006\\mo12\\dy21\\hr3\\min24\\sec20}{\\version1}{\\vern262367}}\\paperw12240\\paperh15840\\margl360\\margr0\\margt239\\margb0\\deftab720\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 __________________________________________________________________________________________}{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 PLEASE RETURN THIS STUB WITH YOUR PAYMENT AND ATTACHMENTS}{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Manufacturer:  }{\\field{\\*\\fldinst{\\f1\\fs20\\cf0\\up0\\dn0 MANUFACTURER INFO1}}{\\fldrslt{\\f1\\fs20\\cf0\\up0\\dn0 26}}}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1                                                                }{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Manufacturer ID:  }{\\field{\\*\\fldinst{\\f1\\fs20\\cf0\\up0\\dn0 MANUFACTURER INFO2}}{\\fldrslt{\\f1\\fs20\\cf0\\up0\\dn0 27}}}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1                                                             }{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Invoice Number:  }{\\field{\\*\\fldinst{\\f1\\fs20\\cf0\\up0\\dn0 INVOICE NUMBER2}}{\\fldrslt{\\f1\\fs20\\cf0\\up0\\dn0 28}}}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1                                                              }{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Quarter Billed:  }{\\field{\\*\\fldinst{\\f1\\fs20\\cf0\\up0\\dn0 SELECTED QUARTER2}}{\\fldrslt{\\f1\\fs20\\cf0\\up0\\dn0 29}}}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1                                                              }{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Rebate payments should be made payable to Maryland - ACS and sent with the accompanying documentation }\\ql{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 (ROSI/PQAS) to:}{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Medical Assistance Recoveries (State Only)}{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Office of Operations, Eligibility & Pharmacy}{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Medical Care Programs}{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1     P.O. Box 13045}{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0\\tab}{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1 Baltimore, MD 21298-9892}{\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0\\par}\\pard\\ql\\li0\\fi0\\ri1440{\\f1\\fs20\\cf0\\up0\\dn0 \\loch\\af1';
    this.getHtmlOutput(text);
    // this.state = {
    //   editorState: EditorState.createWithContent(state),
    // };

    // console.log(
    //   JSON.stringify(this.state.editorState.getCurrentContent()),
    //   'eee'
    // );
    // const newEditorState = this.insertCharacter(this.state.editorState);
    // this.setState({
    //   editorState: EditorState.createWithContent(state),
    // });
  };

  getHtmlOutput = (data) => {
    // const data = rtfData.page;
    rtfToHTML.fromString(data, { template }, (err, html) => {
      console.log(html);
      const blocksFromHTML = convertFromHTML(html);
      const state = ContentState.createFromBlockArray(blocksFromHTML);
      this.setState({
        editorState: EditorState.createWithContent(state),
      });
    });
  };

  addNewData = () => {
    console.log('this.state.editorState---', this.state.editorState);

    // convert the raw state back to a useable ContentState object

    // this.state = {
    //   editorState: EditorState.createWithContent(this.state),
    // };

    // console.log(
    //   JSON.stringify(this.state.editorState.getCurrentContent()),
    //   'eee'
    // );
    const newEditorState = this.insertCharacter(
      'hi this is new data',
      this.state.editorState
    );
    this.setState({
      editorState: newEditorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor">
        <button onClick={this.addNewData}>AddNew</button>
        <button onClick={this.update}>update</button>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
    );
  }
}

const App = () => (
  <div>
    <h2>Test with React Draft Wysiwyg.</h2>
    <EditorContainer />
  </div>
);

render(<App />, document.getElementById('root'));
