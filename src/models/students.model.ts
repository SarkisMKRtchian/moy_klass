import { DataType, Model } from "sequelize-typescript";
import sequlize from "../database";
import { ILessonStudents } from "./lesson-students.model";

export interface IStudent{
    id: number;
    name: string;
    lesson_students?: Model<ILessonStudents>;
}

export const Students = sequlize.define<Model<IStudent>>('students', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },

    name: {
        type: DataType.CHAR(10),
        allowNull: false,
        field: 'name'
    }
}, {timestamps: false})
