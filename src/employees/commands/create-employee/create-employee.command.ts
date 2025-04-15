export class CreateEmployeeCommand {
  id: number;
  name: string;
  managerId?: number;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}
