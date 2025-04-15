import { Exclude, Expose, Type } from 'class-transformer';
import { contactInfoDTO } from './contact-info.dto';

@Exclude()
export class EmployeeDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  managerId?: number;
  @Type(() => contactInfoDTO)
  @Expose()
  contactInfo?: contactInfoDTO;
}
