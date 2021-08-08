import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props)
    // 输入的值 开始就是显示
    const html = this.props.detail || ''
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState,
      }
    }
  }
  state = {
    editorState: EditorState.createEmpty(this.props.detail), // 创建一个没有内容的编辑对象
  }

  // 输入的回调
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  getText = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{
            minHeight: 200,
            paddingLeft: 10,
            border: '1px solid #000',
          }}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}
