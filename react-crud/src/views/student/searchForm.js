import React, { useState } from "react";
import {
    Row,
    Col,
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Checkbox,
} from "antd";
import "./styles.css";

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const SearchForm = ({ setCondition }) => {
    const [form] = Form.useForm();
    const [isAsc, setIsAsc] = useState(true);

    const onFinish = (values) => {
        console.log(form.getFieldValue());
        setCondition({ ...form.getFieldValue(), sortOrder: isAsc });
    };

    const onReset = () => {
        form.resetFields();
    };

    const onChange = (e) => {
        setIsAsc(e.target.checked);
    };

    return (
        <div className="search-form-container">
            <h1>STUDENT PAGE</h1>
            <Row className="search-form" gutter={16}>
                <Col span={12}>
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                    >
                        <Form.Item name="name" label="Tên Học Sinh">
                            <Input />
                        </Form.Item>
                        <Form.Item name="LopId" label="Lớp">
                            <Select defaultValue="ALL">
                                <Option value="ALL">
                                    {"----> TẤT CẢ <----"}
                                </Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                                prevValues.gender !== currentValues.gender
                            }
                        >
                            {({ getFieldValue }) =>
                                getFieldValue("gender") === "other" ? (
                                    <Form.Item
                                        name="customizeGender"
                                        label="Customize Gender"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                        <Form.Item name="NgaySinh" label="Ngày sinh">
                            <RangePicker placeholder={["Từ", "Đến"]} />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>
                    <Row justify="center">
                        <Checkbox onChange={onChange}>
                            Sắp xếp tăng dần theo tên
                        </Checkbox>
                    </Row>
                    <Row justify="center"></Row>
                </Col>
                <Col span={24}>
                    <Row justify="center">
                        <Col span={16} className="action">
                            <Row justify="space-between">
                                <Button type="primary" onClick={onFinish}>
                                    Tìm kiếm
                                </Button>
                                <Button type="primary" onClick={onReset}>
                                    Thêm mới
                                </Button>
                                <Button type="primary" onClick={onReset}>
                                    Xóa
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default SearchForm;
