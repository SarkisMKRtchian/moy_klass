import { NextFunction, Request, Response } from "express";
import { Lessons, Students, Teachers } from "../models";
import { GetLessonsDto } from "../dto/get-lessons.dto";
import { ILesson } from "../models/lessons.model";
import { Op, WhereOptions } from "sequelize";
import { ITeacher } from "../models/teachers.model";
import { ApiException } from "../exceptions/ApiException";

class LessonsController {


    public async getLessons(req: Request, res: Response, next: NextFunction): Promise<void> {
        const dto = req.query as unknown as GetLessonsDto;
        const page = +dto?.page || 1;
        const limit = +dto.lessonsPerPage || 5;
        const offset = page * limit - limit;

        const where: WhereOptions<ILesson> = {};
        const whereTeachers: WhereOptions<ITeacher> = {}

        if(dto.date){
            const date = dto.date.split(",");
            if(date.length > 2) return next(new ApiException('Неверный формат даты', 400));
            if(date.some(date => isNaN(new Date(date).getTime()))) return next(new ApiException('Неверный формат даты', 400));
            

            where['date'] = date.length > 1 ? {
                [Op.between]: [date[0], date[1]]
            } : {
                [Op.eq]: date[0]
            }
            
        }

        if(dto.status){
            if(!['0', '1'].includes(dto.status)) return next(new ApiException('Неверный статус', 400));
            where['status'] = {[Op.eq]: dto.status}
        }


        if(dto.teacherIds){
            const ids = dto.teacherIds.split(', ').map(id => +id);
            if(ids.some(id => isNaN(id))) return next(new ApiException('Неверный id преподавателя', 400));
            whereTeachers['id'] = {[Op.in]: ids}
        }

        const lessons = await Lessons.findAll({
            where,
            include: [
                { model: Students, as: 'students' },
                { model: Teachers, as: 'teachers', where: whereTeachers },
            ],
            limit, offset,
            order: [['id', 'ASC']]

        });

        const result = lessons.map(lesson => {
            const value = lesson.dataValues;
            return {
                id: value.id,
                date: value.date,
                title: value.title,
                status: value.status,
                students: value.students.map(student => ({ name: student.dataValues.name, id: student.id, visit: student.dataValues.lesson_students?.dataValues.visit || false })),
                teachers: value.teachers.map(teacher => ({ name: teacher.dataValues.name, id: teacher.id })),
                visitCount: value.students?.reduce((initial, student) => {
                    if (!student.dataValues.lesson_students.dataValues.visit) return initial;

                    return ++initial;
                }, 0)

            }
        });
        
        if(dto.studentsCount){
            const count = dto.studentsCount?.split(',');
            if(count?.length > 2 || count?.some(count => isNaN(+count) || +count < 0)) 
                return next(new ApiException('Неверный формат количества студентов', 400));
            
            if(count?.length > 1){
                res.json(result.filter(lesson => lesson.students.length >= +count[0] && lesson.students.length <= +count[1])); return;
            }else{
                res.json(result.filter(lesson => lesson.students.length === +count[0])); return;
            }
        }
        res.json(result)
    }
}

export default new LessonsController();