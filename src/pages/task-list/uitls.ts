import dayjs from "dayjs";

export const timeFormat = (time: number = 9 * 60) => {
    return [Math.floor(time as number / 60), (time as number) % 60].map(val => val < 10 ? ("0" + val) : val).join(":");
}
export const buildDateTime = (date: number, time: number) => {
    const ret = dayjs(date).toDate();
    ret.setMinutes(time);
    return ret;
}
export const str2color = (
    str: string,
    scope: {
        from?: number;
        to?: number;
    } = {},
): string => {
    const { from = 0x333333, to = 0xcccccc } = { from: 0x333333, to: 0xcccccc, ...scope };
    const str2code = str.replace(/[^\d]/g, $1 => $1.charCodeAt(0).toString());
    const mod = parseFloat(str2code) % to;
    const value = mod < from ? mod + from : mod;
    const rgbValue = `000000${value.toString(16)}`.match(/\0*([\dA-Fa-f]{6,6})$/);
    // .match(/\0*([\dA-Fa-f]{6,6})$/)[0]
    return `#${rgbValue ? rgbValue[0] : value.toString(16)}`;
};
