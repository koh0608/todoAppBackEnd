export class TodoDto {
  title: string;
  link: string;
  tag: string;
  dueDate: Date;
  creator: number;
}

//need change db to enum

// export enum TaskStatus {
//   OPEN = 'OPEN',
//   IN_PROGRESS = 'IN_PROGRESS',
//   HOLD = 'HOLD',
//   OVERDUE = 'OVERDUE',
//   DONE = 'DONE',
//   DELETE = 'DELETE'
// }
