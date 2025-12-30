
import { Cooperative, PartnerRole } from "../entities";

export class PartnerDto {
    id: string;
    fullname: string;
    email?: string;
    phone?: string;
    taxId: string;
    cooperative?: Cooperative;
    role?: string;
}
