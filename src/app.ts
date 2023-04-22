import express from "express";
import cors from "cors";
import cron from "node-cron";
import * as dontenv from 'dotenv'

import { pizzasRoutes } from "./routes/pizzas.routes";
import { solicitationsRoutes } from "./routes/solicitations.routes";
import { sendEmailSolicitationsInProduction } from "./jobs/sendEmailSolicitationsInProduction";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(pizzasRoutes);
app.use(solicitationsRoutes);

dontenv.config()

cron.schedule('*/1 * * * *' , sendEmailSolicitationsInProduction);

/*
('* * * * * *') = second (optional), minute, hour, day of month,  month, day of week 
usando todos os * a função será executada a cada 1 minuto, usar o cron job guru para testar.
*/



