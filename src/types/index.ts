export type InputError = {
    type: string
    value: string
    msg: string
    path: string
    location: string
}

export type InputErrors = {
    errors: InputError[]
}