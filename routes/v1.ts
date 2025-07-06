import { Router } from "express";
import { DocumentRouter } from "../api/document";

export const V1Router = Router();

// @ts-expect-error
V1Router.use('/documents', DocumentRouter);