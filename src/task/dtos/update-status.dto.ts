import { ApiProperty } from '@nestjs/swagger';

enum TaskStatus {
  todo = 'todo',
  inprogress = 'inprogress',
  completed = 'completed',
}
export class UpdateStatusDTO {
  @ApiProperty({
    enum: TaskStatus,
    isArray: false,
  })
  status: TaskStatus;
}
