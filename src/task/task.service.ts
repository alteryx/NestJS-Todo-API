import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { UpdateStatusDTO } from './dtos/update-status.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(taskId: Task['id']) {
    return this.tasksRepository.findOneBy({ id: taskId });
  }

  async createTask(taskInput: CreateTaskDTO): Promise<Task> {
    const fullTask = {
      name: taskInput.name,
      completed: false,
    };

    const inserted = await this.tasksRepository.save(fullTask);
    return inserted;
  }

  async toggleTask(taskId: number): Promise<boolean> {
    const _old = await this.tasksRepository.findOneBy({ id: taskId });
    if (!_old || !_old.id) return false;
    const _new = { ..._old, completed: !_old.status };
    await this.tasksRepository.update({ id: taskId }, _new);
    return true;
  }

  async setAllStatuses(status: TaskStatus) {
    console.log({ status });
    const query = this.tasksRepository
      .createQueryBuilder()
      .update()
      .set({ status });

    await query.execute();
  }
}
