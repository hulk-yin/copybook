import TaskStorage from "./storage";
import dayjs from "dayjs";

const task = new TaskStorage()
export const load = () => {
    return task.load()
}
export const queryByDate=(date:number=parseInt(dayjs(new Date()).format("YYYYMMDD")))=>{
    return task.query({startDate:date,endDate:date})
}
export const save = (data: Task) => {
    if(data.id){
        return task.update(data);
    }
    return task.add(data)
}
export const remove=(id: string) => {
    return task.remove(id);
}