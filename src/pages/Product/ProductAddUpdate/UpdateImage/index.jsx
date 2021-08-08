import React from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false, // 标识是否显示大图预览 modal
    previewImage: '', // 大图的 url
    previewTitle: '', // 大图的标题
    fileList: [],
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }

  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      const result = file.response
      if (result.status === 0) {
        message.success('上传图片成功')
      } else {
        message.error('上传图片失败')
      }
    }
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <>
        <Upload
          accept="image/*"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}
