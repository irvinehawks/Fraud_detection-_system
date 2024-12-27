/* eslint-disable prettier/prettier */
// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // Use a secure secret
    });
  }

  async validate(payload: any) {
    // The payload is extracted from the JWT
    return { userId: payload.sub, username: payload.username };
  }
}