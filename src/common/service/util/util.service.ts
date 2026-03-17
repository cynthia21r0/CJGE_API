import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {
    public async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    public async checkPassword(password: string, encrtyptedPassword: string) {
        return await bcrypt.compareSync(password, encrtyptedPassword);
    }

    public async comparePassword(password: string,hashedPassword: string,): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
    }
}