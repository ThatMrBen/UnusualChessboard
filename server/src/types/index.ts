import { Request, Response, NextFunction } from 'express';

export interface ErrorWithStatus extends Error {
  statusCode?: number;
}

export type ErrorHandlerMiddleware = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => void; 