"use server"
import connectDB from "@/db/connnectDB"
import Tasks from "@/models/Tasks"

type Tasksprops = {
    task: string
    status: string,
    id: number
}

type updateTasksprops = {
    item: Tasksprops
    id: number
    status: string
}

type deleteTasksprops = {
    id: number
    status: string
}

export const getTasks = async (username: string) => {
    await connectDB()
    const tasks = await Tasks.find({ username: username }, { username: 0 })
    return JSON.parse(JSON.stringify(tasks))
}
// await Tasks.updateMany({ username: "het chawda", id: { $lt: task.id }, status: task.status }, { $inc: { id: -1 } })

export const addTasks = async (task: Tasksprops) => {
    await connectDB()
    const tasks = await Tasks.create({
        username: "het chawda",
        task: task.task,
        status: task.status,
        id: task.id
    })
    await tasks.save()
}

export const updateTasks = async (task: updateTasksprops) => {
    await connectDB()
    if (task.item.status !== task.status) {
        console.log(task.item.id + " " + task.item.status, task.id + " " + task.status)
        await Tasks.updateMany({ username: "het chawda", id: { $gte: task.id }, status: task.status }, { $inc: { id: 1 } })
        await Tasks.updateMany({ username: "het chawda", id: { $gt: task.item.id }, status: task.item.status }, { $inc: { id: -1 } })
        await Tasks.updateOne({ username: "het chawda", id: task.item.id, status: task.item.status }, { status: task.status, id: task.id })
    }
    else {
        if (task.item.id > task.id) {
            // Moving up
            const tasks = await Tasks.findOne({ username: "het chawda", id: task.item.id, status: task.item.status }, { username: 0 })
            console.log(tasks, task.item.id + " " + task.item.status, task.id + " " + task.status)
            await Tasks.updateMany({ username: "het chawda", id: { $lt: task.item.id, $gte: task.id }, status: task.status }, { $inc: { id: 1 } })
            await Tasks.updateOne({ username: "het chawda", _id: tasks._id }, { $set: { id: task.id } })
        }
        else if (task.item.id !== task.id - 1 && task.item.id < task.id) {
            // Moving down
            const tasks = await Tasks.findOne({ username: "het chawda", id: task.item.id, status: task.item.status }, { username: 0 })
            await Tasks.updateMany({ username: "het chawda", id: { $lt: task.id, $gte: task.item.id }, status: task.status }, { $inc: { id: -1 } })
            await Tasks.updateOne({ username: "het chawda", _id: tasks._id }, { $set: { id: task.id - 1 } })
        }
    }
}
export const deleteTasks = async (task: deleteTasksprops) => {
    await connectDB()
    await Tasks.deleteOne({ username: "het chawda", id: task.id, status: task.status })
    console.log(task.id + " " + task.status)
    await Tasks.updateMany({ username: "het chawda", id: { $gt: task.id }, status: task.status }, { $inc: { id: -1 } })
}