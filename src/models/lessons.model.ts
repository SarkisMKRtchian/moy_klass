import { DataType, Model } from "sequelize-typescript";
import sequlize from "../database";
import { IStudent } from "./students.model";
import { ITeacher } from "./teachers.model";

export interface ILesson{
    id: number,
    date: Date,
    title: string,
    status: number,
    students?: Model<IStudent>[];
    teachers?: Model<ITeacher>[];
}

export const Lessons = sequlize.define<Model<ILesson>>('lessons', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },

    date: {
        type: DataType.DATEONLY,
        allowNull: false,
        field: 'date'
    },

    title: {
        type: DataType.TEXT,
        allowNull: false,
        field: 'title'
    },

    status: {
        type: DataType.INTEGER,
        allowNull: false,
        field: 'status'
    }
}, {timestamps: false})
