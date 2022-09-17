import "./users-page.css";
import { Button, Form, Input, Select, Upload } from "antd";
import { Table, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CreateandEditUser from "./CreateandEditUser.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  hideCreateUserModal,
  selectItemForEdit,
  showCreateUserModal,
} from "./usersSlice.js";
import { useEffect, useRef, useState } from "react";
import {
  deleteUserAsync,
  getUsersAsync,
  hideUploadUsersModal,
  showUploadUsersModal,
} from "./usersSlice";
import UserSwitchOutlined from "@ant-design/icons/es/icons/UserSwitchOutlined";
import UploadUsers from "./UploadUsers";

export default function UsersPage() {
  const usersState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getUsersRunning = useRef(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!getUsersRunning.current) {
      getUsersRunning.current = true;
      dispatch(getUsersAsync({})).then(() => (getUsersRunning.current = false));
    }
  }, [usersState.doUpdateUser]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Date of Birth",
    //   dataIndex: "dob",
    //   key: "dob",
    //   render: (value) => {
    //     return moment(value).format("MMM Do YY");
    //   },
    // },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => {
              dispatch(selectItemForEdit(record));
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => {
              dispatch(deleteUserAsync(record.email));
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="button-container">
        <Space>
          <Form
            layout={"inline"}
            onFinish={(values) => dispatch(getUsersAsync(values))}
          >
            <Form.Item name="search" label="Search">
              <Input
                onChange={(event) => setSearch(event?.target?.value)}
                value={search}
              />
            </Form.Item>
            <Form.Item name="role" label="Role">
              <Select placeholder={"Select Role..."} allowClear>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="leader">Team Lead</Select.Option>
                <Select.Option value="agent">Agent</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="department" label="Department">
              <Select placeholder={"Select Department..."} allowClear>
                <Select.Option value="finance">Finance</Select.Option>
                <Select.Option value="hr">HR</Select.Option>
                <Select.Option value="billing">Billing</Select.Option>
              </Select>
            </Form.Item>
            <Button
              icon={<SearchOutlined />}
              type={"primary"}
              htmlType={"submit"}
            >
              Search
            </Button>
          </Form>
        </Space>
        <Space>
          <Button
            icon={<PlusOutlined />}
            onClick={() => dispatch(showCreateUserModal())}
          >
            Add User
          </Button>
          <Button
            icon={<UserSwitchOutlined />}
            onClick={() => dispatch(showUploadUsersModal())}
          >
            Upload Users
          </Button>
        </Space>
      </div>
      <Table
        dataSource={usersState.users}
        columns={columns}
        loading={usersState.getUsersLoading}
        pagination={{
          pageSize: 10,
          current: usersState.currentPage,
          total: usersState.totalUsers,
          onChange: (page) => dispatch(getUsersAsync({ page })),
        }}
      />
      ;
      {usersState.showModal && (
        <CreateandEditUser
          visible={usersState.showModal}
          handleCancel={() => dispatch(hideCreateUserModal())}
          initialValues={usersState.itemSelectedForEdit}
        />
      )}
      {usersState.showUploadUsersModal && (
        <UploadUsers
          visible={usersState.showUploadUsersModal}
          handleCancel={() => dispatch(hideUploadUsersModal())}
        />
      )}
    </div>
  );
}
