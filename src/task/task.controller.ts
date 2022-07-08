import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateTaskDTO } from './dtos/task.dto';
import { Task, TaskStatus } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * A list of Tasks in an array
   */
  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  /**
   * Return's the task with associated id.
   * @param taskId Gets a task by its id
   * @returns Task with given id
   */
  @Get(':id')
  getTaskById(@Param('id') taskId: number) {
    const task = this.taskService.getTaskById(taskId);
    return task;
  }

  /**
   * Given a name, creates a new task and returns it
   */
  @Post()
  @ApiBody({ type: [CreateTaskDTO] })
  createTask(@Body() taskInput: CreateTaskDTO) {
    return this.taskService.createTask(taskInput);
  }

  /**
   * Toggles a task's completed status between true and false, given that task's id
   */
  @Put('/toggle/:taskId')
  toggleTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.toggleTask(taskId);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    this.taskService.deleteTask(id);
    return `Deleted task with task id: ${id}`;
  }

  @Delete()
  deleteAllTasks() {
    this.taskService.deleteAllTasks();
    return `Deleted all tasks`;
  }

  /**
   * Sets ALL tasks' statuses to a given status
   */
  @Put('/markAll/:status')
  toggleAllTasks(@Param('status') status: TaskStatus) {
    return this.taskService.setAllStatuses(status);
  }
}
