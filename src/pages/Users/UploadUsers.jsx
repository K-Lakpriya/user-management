import React from "react";
import { Button, Modal, Upload } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { uploadFile } from "./usersSlice";
import { useDispatch } from "react-redux";
import sample from "../../../src/assets/sample.png";
import { Space } from "antd";

const UploadUsers = ({ visible, handleCancel }) => {
  const dispatch = useDispatch();
  return (
    <Modal visible={visible}
           title="Add User"
           onCancel={handleCancel}
           footer={false}>
      <Upload name={"file"} action={"http://localhost:3000/users/upload"}
              onChange={({ file }) => dispatch(uploadFile(file.response))} accept={".xlsx"}
              headers={{"Authorization": `Bearer ${JSON.parse(localStorage.getItem("session"))?.token}`}}
      >
        <Space direction="vertical">
          <h2>Sample Format</h2>
          <h3>Upload format should be exactly same and excel document.</h3>
          <img src={sample} alt="Logo"/>
          <Button icon={<ImportOutlined/>}>Import</Button>
        </Space>
      </Upload>
    </Modal>
  );
};

export default UploadUsers;