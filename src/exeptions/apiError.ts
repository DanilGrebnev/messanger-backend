export class ApiError extends Error {
    status: number
    errors: any

    constructor(status: number, message: any, errors: any = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnathorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message?: any, errors?: any) {
        return new ApiError(400, message, errors)
    }
}
