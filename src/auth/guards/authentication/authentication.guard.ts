import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardmap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
      [AuthType.Bearer]: this.accessTokenGaurd,
      [AuthType.None]: { canActivate: () => true }
    }

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGaurd: AccessTokenGuard
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()]
    ) ?? [AuthenticationGuard.defaultAuthType]

    const guards = authTypes.map((authType: number) => this.authTypeGuardmap[authType]).flat();

    const error = new UnauthorizedException();

    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context)
      ).catch((err) => {
        error: err;
      });
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
