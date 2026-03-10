import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const securedRequest = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-jwt-token',
      'X-App-Client': 'employee-dashboard'
    }
  });

  return next(securedRequest);
};
