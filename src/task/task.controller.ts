import {
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateTaskDTO } from './dtos/task.dto';
import { UpdateStatusDTO } from './dtos/update-status.dto';
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
   * Given a name, creates a new task and returns it
   */
  @Post()
  createTask(@Param() taskInput: CreateTaskDTO) {
    return this.taskService.createTask(taskInput);
  }

  /**
   * Toggles a task's completed status between true and false, given that task's id
   */
  @Patch(':taskId/toggle')
  toggleTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.toggleTask(taskId);
  }

  /**
   * Sets ALL tasks' statuses to a given status
   */
  @Patch('/toggleAll')
  toggleAllTasks(@Body() { status }: UpdateStatusDTO) {
    return this.taskService.setAllStatuses(status);
  }
}
