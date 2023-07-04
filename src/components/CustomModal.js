import { Modal } from 'antd'
import React from 'react'

const CustomModal = ({open, hideModal, performAction, title}) => {
  return (
    <div>
        <Modal
        title="Modal"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText=""
        cancelText=""
      >
        <p>{title}</p>
      </Modal>
    </div>
  )
}

export default CustomModal