import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map(data => {
        // Nếu response đã được gọi với res.json() hoặc stream, bỏ qua
        if (response.headersSent) return data;
        const statusCode = response.statusCode;
        return {
          statusCode,
          message: this.getStatusMessage(statusCode),
          data: data ?? null,
        };
      }),
    );
  }

  private getStatusMessage(code: number) {
    switch (code) {
      case 201:
        return 'Created';
      case 204:
        return 'No Content';
      default:
        return 'Success';
    }
  }
}
