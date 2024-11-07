import { DataType, Model } from "sequelize-typescript";
import sequlize from "../database";

export interface ILessonStudents{
    lessonId: number;
    studentId: number;
    visit: boolean;
}

export const LessonStudents = sequlize.define<Model<ILessonStudents>>('lesson_students', {
    lessonId: {
        type: DataType.INTEGER,
        allowNull: false,
        field: 'lesson_id',
    },

    studentId: {
        type: DataType.INTEGER,
        allowNull: false,
        field: 'student_id',
    },

    visit: {
        type: DataType.BOOLEAN,
        allowNull: false,
        field: 'visit',
    }
}, {timestamps: false})

