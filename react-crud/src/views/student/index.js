import React, { useState, useEffect } from "react";
import API from "../../api";
import { formatDate } from "../../utils";
import "./styles.css";
import SearchForm from "./searchForm";
import TableStudent from "./tableStudent";

const Student = () => {
    const [condition, setCondition] = useState({});
    const [students, setStudent] = useState([]);

    useEffect(() => {
        getStudents("students");
    }, []);

    useEffect(() => {
        const url = `students?kw=${condition.name ?? ""}&sortOrder=${
            condition.sortOrder ?? false
        }`;
        getStudents(url);
    }, [condition]);

    const getStudents = (url) => {
        API.get(url)
            .then((res) => {
                setStudent(
                    res.data.map((student) => ({
                        ...student,
                        GioiTinh: student.GioiTinh === 1 ? "Nam" : "Nữ",
                        DiemTB: student.DiemTB?.toFixed(2),
                        NgaySinh: formatDate(student.NgaySinh),
                    }))
                );
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="student-container">
            <SearchForm setCondition={setCondition} />
            <TableStudent students={students} />
        </div>
    );
};

export default Student;
