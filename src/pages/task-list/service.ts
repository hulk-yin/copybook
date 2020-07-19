import TaskStorage from "./storage";

const task = new TaskStorage()
export const load = () => {
    return task.load()
}
export const queryByDate=({startDate,endDate}:{startDate:Date,endDate:Date})=>{

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