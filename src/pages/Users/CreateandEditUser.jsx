import { Modal, Button, Form, Input, Select, Space } from "antd";
import {useDispatch, useSelector} from "react-redux";
import { createUserAsync, updateUserAsync } from "./usersSlice";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

function CreateandEditUser({ visible, handleCancel, initialValues }) {
  const [form] = Form.useForm();
  const usersState = useSelector(state => state.users)
  const dispatch = useDispatch();

  const onFinish = (values) => {
    if (initialValues) {
      dispatch(updateUserAsync(values));
    } else {
      dispatch(createUserAsync(values));
    }

  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Add User"
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true
            }
          ]}
        >
          <Input readOnly={!!initialValues}
          />
        </Form.Item>
        {/*<Form.Item*/}
        {/*  name="dob"*/}
        {/*  label="Date of Birth"*/}
        {/*  rules={[*/}
        {/*    {*/}
        {/*      required: true,*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*>*/}
        {/*  <DatePicker />*/}
        {/*</Form.Item>*/}
        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: "Please select role!"
            }
          ]}
        >
          <Select>
            <Option value="manager">Manager</Option>
            <Option value="leader">Team Lead</Option>
            <Option value="agent">Agent</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="leader"
          label="Leader"
        >
          <Select allowClear>
            {usersState.users?.filter(user => user.role === 'leader').map((user, index) => <Option key={index} value={user.email}>{user.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
          rules={[
            {
              required: true,
              message: "Please select department!"
            }
          ]}
        >
          <Select>
            <Option value="finance">Finance</Option>
            <Option value="HR">HR</Option>
            <Option value="Billing">Billing</Option>
          </Select>
        </Form.Item>
        {initialValues ? null: <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true
            }
          ]}

        >
          <Input type={"password"}/>
        </Form.Item>}

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateandEditUser;
