import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class contactInfoDTO {
  @Expose()
  phone?: string;
  @Expose()
  email?: string;
}
