import { DataType, Model } from "sequelize-typescript";
import sequlize from "../database";


export interface ILessonTeachers{
    lessonId: number;
    teacherId: number;
}

export const LessonTeachers = sequlize.define<Model<ILessonTeachers>>('lesson_teachers', {
    lessonId: {
        type: DataType.INTEGER,
        allowNull: false,
        field: 'lesson_id',
    },

    teacherId: {
        type: DataType.INTEGER,
        allowNull: false,
        field: 'teacher_id',
    }
}, {timestamps: false})

