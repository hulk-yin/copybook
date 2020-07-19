
interface ITask extends Task {
    // id: string
}

export default class TaskStorage {
    constructor() {
        this.db = new Promise((resolve, reject) => {
            var request = window.indexedDB.open("study");
            request.onsuccess = (event: any) => {
                const db = event.target.result;
                resolve(db)
            }
            request.onupgradeneeded = (event: any) => {
                const db = event.target.result;
                const objectStore: IDBObjectStore = db.createObjectStore('task-list', { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('startDate', 'startDate', { unique: false });
                objectStore.createIndex('endDate', 'endDate', { unique: false });
                resolve(db)
            }
            request.onerror = (event) => {
                reject(event)
            }
        })
    }
    private db: Promise<IDBDatabase>
    private get store() {
        return this.db.then(db => db.transaction(["task-list"], "readwrite").objectStore("task-list"))
    }
    async load(): Promise<ITask[]> {
        const store = await this.store;
        const request = store.getAll() as IDBRequest<ITask[]>
        return await new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result)
            request.onerror = reject
        })
    }
    async add(task: Partial<ITask>) {
        const store = await this.store;
        const request = store.add(task)
        return await new Promise((resolve, reject) => {
            request.onsuccess = (e) => {
                resolve(true)
            }
            request.onerror = (e) => {
                console.log(e);
                reject(e)

            }
        })
    }
    async update(task: ITask) {
        const store = await this.store;
        const request = store.put(task);
        return await new Promise((resolve, reject) => {
            request.onsuccess = (e) => {
                resolve(request.result)
            }
            request.onerror = reject
        })
    }
    async remove(id: string) {
        const store = await this.store;
        store.delete(id)
    }
    async query({ startDate, endDate = startDate }: { startDate: number, endDate?: number }): Promise<ITask[]> {
        const store = await this.store;
        const request = store.getAll() as IDBRequest<ITask[]>
        return await new Promise((resolve, reject) => {
            request.onsuccess = (e) => {
                resolve((request.result).filter((task) => {
                    if (startDate >= task.startDate && endDate <= task.endDate) {
                        return true
                    }
                    return false
                }).sort((a, b) => {
                    return a.startTime - b.startTime
                }))
            }
            request.onerror = reject
        })
    }
}