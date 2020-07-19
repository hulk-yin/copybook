export const timeFormat = (time: number | string = 9 * 60) => {
    return [Math.floor(time as number / 60), (time as number) % 60].map(val => val < 10 ? ("0" + val) : val).join(":");
}