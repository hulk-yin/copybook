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
     export enum Week {
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
    repeat: boolean
    repeatType: Task.RepeatType
    repeatDays: Array<TWeek>
    startTime: string
    endTime: string
    startDate: Date
    endDate: Date
}
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