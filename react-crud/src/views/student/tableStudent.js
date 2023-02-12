import React, { useState } from "react";
import { Table } from "antd";

const columns = [
    {
        title: "Họ",
        dataIndex: "HoHocSinh",
    },
    {
        title: "Tên",
        dataIndex: "TenHocSinh",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Ngày sinh",
        dataIndex: "NgaySinh",
    },
    {
        title: "Giới tính",
        dataIndex: "GioiTinh",
    },
    {
        title: "Điểm 1",
        dataIndex: "Diem1",
    },
    {
        title: "Điểm 2",
        dataIndex: "Diem2",
    },
    {
        title: "Điểm 3",
        dataIndex: "Diem3",
    },
    {
        title: "Điểm TB",
        dataIndex: "DiemTB",
    },
    {
        title: "Tình trạng",
        dataIndex: "TinhTrang",
    },
    {
        title: "",
        dataIndex: "",
        key: "x",
        render: () => (
            <div className="action-link">
                <a>Cập nhật</a> | <a>Xóa</a>
            </div>
        ),
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === "Disabled User",
        // Column configuration not to be checked
        name: record.name,
    }),
};
const TableStudent = ({ students }) => {
    return (
        <div className="table-student-container">
            <Table
                rowKey="id"
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={students}
                size="small"
            />
        </div>
    );
};
export default TableStudent;
