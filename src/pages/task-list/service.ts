import TaskStorage from "./storage";

const task = new TaskStorage()
export const load = () => {
    return task.load()
}
export const add = (data: Task) => {
    return task.add(data)
}
export const remove=(id: string) => {
    return task.remove(id);
}