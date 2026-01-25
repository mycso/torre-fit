export type ApiOk<T> = {ok: true; data: T};
export type ApiErr = { ok: false; error: {message: string; status?: number} };
export type ApiResult<T> = ApiOk<T> | ApiErr;

export function ok<T>(data: T): ApiOk<T> {
    return {ok: true, data}
}

export function err(message: string, status?: number): ApiErr {
    return { ok: false, error: {message, status}};
}