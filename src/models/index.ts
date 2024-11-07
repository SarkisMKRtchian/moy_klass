import { LessonStudents } from "./lesson-students.model";
import { LessonTeachers } from "./lesson-teachers.model";
import { Lessons } from "./lessons.model";
import { Students } from "./students.model";
import { Teachers } from "./teachers.model";

Lessons.belongsToMany(Students, { through: LessonStudents });
Lessons.belongsToMany(Teachers, { through: LessonTeachers });
Teachers.belongsToMany(Lessons, { through: LessonTeachers });
Students.belongsToMany(Lessons, { through: LessonStudents });

export {Students, Teachers, Lessons, LessonStudents, LessonTeachers};