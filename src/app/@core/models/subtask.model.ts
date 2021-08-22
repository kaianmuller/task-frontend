import { NivelPrioridad } from "./enums/prioridad";
import { Status } from "./enums/status";

export class Susbtask {
    "id": number;
    "titulo": string;
    "descripcion": string;
    "nivelPrioridad": NivelPrioridad;
    "status": Status;
}