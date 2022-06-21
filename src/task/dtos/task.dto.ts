import { PickType } from '@nestjs/swagger';
import { Task } from '../task.entity';

export class CreateTaskDTO extends PickType(Task, ['name' as const]) {}
