import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UtilService {
    constructor(private readonly jwtSvc: JwtService) {}
    public async hash(password: string) {
        return await bcrypt.hash(password, 10);
    }

    public async checkPassword(password: string, encryptedPassword: string) {
        return await bcrypt.compareSync(password, encryptedPassword);
    }

    public async comparePassword(password: string,hashedPassword: string,): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
    }

    public async generateJWT(payload: any, expiresIn: any = '1h') {
        return await this.jwtSvc.signAsync(payload, { 
            expiresIn: expiresIn
        })
    }

    public async getPayload(token: string) {
        return await this.jwtSvc.verifyAsync(token)
    }
}