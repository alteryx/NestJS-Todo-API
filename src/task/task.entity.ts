import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  todo = 'todo',
  inprogress = 'inprogress',
  completed = 'completed',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.todo,
  })
  status: TaskStatus;
}
