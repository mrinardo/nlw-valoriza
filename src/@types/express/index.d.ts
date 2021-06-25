// É necessário alterar configuração typeRoots em tsconfig.json.

declare namespace Express {
    export interface Request {
        user_id: string;
    }
}