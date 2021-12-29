export function generateGuid(): string {
    var array = new Uint32Array(1)
    return crypto.getRandomValues(array)[0].toString()
}
