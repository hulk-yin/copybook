
declare namespace Task {
    // export enum Week {
    //     Sunday = "Sun",
    //     Monday = "Mon",
    //     Tuesday = "Tue",
    //     Wednesday = "Wed",
    //     Thursday = "Thu",
    //     Friday = "Fri",
    //     Saturday = "Sat",
    // }
    enum Week {
        Sunday = "Sun",
        Monday = "Mon",
        Tuesday = "Tue",
        Wednesday = "Wed",
        Thursday = "Thu",
        Friday = "Fri",
        Saturday = "Sat",
    }
    type RepeatType = "day" | 'weekday' | "weekend" | "other" | "none"
}
interface Task<TWeek = any> {
    id: string,
    name: string
    repeatType: Task.RepeatType
    repeatDays: Array<TWeek>
    startTime: number
    endTime: number
    startDate: number | string
    endDate: number | string
}
// export = Task;
// export as namespace Task;
//  declare enum Week {
//     Sunday = "Sun",
//     Monday = "Mon",
//     Tuesday = "Tue",
//     Wednesday = "Wed",
//     Thursday = "Thu",
//     Friday = "Fri",
//     Saturday = "Sat",
// }
// export default Task
// export Week
// export declare let Week: Task.Week