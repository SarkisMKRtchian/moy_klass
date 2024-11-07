import { DataType, Model } from "sequelize-typescript";
import sequlize from "../database";
import { ILessonTeachers } from "./lesson-teachers.model";


export interface ITeacher{
    id: number;
    name: string;
    lesson_teachers?: Model<ILessonTeachers>;
}

export const Teachers = sequlize.define<Model<ITeacher>>('teachers', {
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