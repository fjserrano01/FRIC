import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/event"
})
const api2 = axios.create({
    baseURL: "http://localhost:5000/user"
})
const api3 = axios.create({
    baseURL: "http://localhost:5000/system"
})
const api4 = axios.create({
    baseURL: "http://localhost:5000/subtask"
})
const api5 = axios.create({
    baseURL: "http://localhost:5000/task"
})
const api6 = axios.create({
    baseURL: "http://localhost:5000/finding"
})

export const insertEvent = payload => api.post(`/event`, payload)
export const getAllEvents = () => api.get(`/events`)
export const updateEvent = (id, payload)=> api.put(`/event/${id}`, payload)
export const deleteEvent = id => api.delete(`/event/${id}`)
export const getEventById = id => api.get(`/events/${id}`)
export const getEventProgress = () => api.get('/progress')

export const insertAnalyst = payload => api2.post(`/analyst`, payload)
export const getAllAnalyst = () => api2.get(`/analysts`)
export const updateAnalyst = (id, payload)=> api2.put(`/analyst/${id}`, payload)
export const deleteAnalyst = id => api2.delete(`/analyst/${id}`)
export const getAnalystById = id => api2.get(`/analyst/${id}`)

export const insertSystem = payload => api3.post(`/system`, payload)
export const getAllSystems = () => api3.get(`/systems`)
export const updateSystem = (id, payload)=> api3.put(`/system/${id}`, payload)
export const updateSystemArchive = (id, payload)=> api3.put(`/systemarch/${id}`, payload)
export const deleteSystem = id => api3.delete(`/system/${id}`)
export const getSystemById = id => api3.get(`/system/${id}`)
export const getArchivedSystems = () => api3.get(`/system/`)

export const insertSubtask = payload => api4.post(`/subtask`, payload)
export const getAllSubtask = () => api4.get(`/subtasks`)
export const updateSubtask = (id, payload)=> api4.put(`/subtask/${id}`, payload)
export const updateSubtaskArchive = (id, payload)=> api4.put(`/subtaskarch/${id}`, payload)
export const deleteSubtask = id => api4.delete(`/subtask/${id}`)
export const getSubtaskById = id => api4.get(`/subtask/${id}`)
export const getSubtaskByTask = id => api4.get(`/subtasktask/${id}`)
export const getArchivedSubtasks = () => api4.get(`/subtask/`)


export const insertTask = payload => api5.post(`/task`, payload)
export const getAllTasks = () => api5.get(`/tasks`)
export const getTasksByDate = (id) => api5.get(`/tasksdate/${id}`)
export const getTasksByDateLate = (id) => api5.get(`/tasksdatelate/${id}`)
export const updateTask = (id, payload)=> api5.put(`/task/${id}`, payload)
export const updateTaskArchive = (id, payload)=> api5.put(`/taskarch/${id}`, payload)
export const deleteTask = id => api5.delete(`/task/${id}`)
export const getTaskById = id => api5.get(`/task/${id}`)
export const getTaskBySystem = id => api5.get(`/tasksystem/${id}`)
export const getArchivedTasks = () => api5.get(`/task/`)

export const insertFinding = payload => api6.post(`/finding`, payload)
export const getAllFindings= () => api6.get(`/findings`)
export const updatefinding = (id, payload)=> api6.put(`/finding/${id}`, payload)
export const updatefindingarchive = (id, payload)=> api6.put(`/findingarch/${id}`, payload)
export const deleteFinding = id => api6.delete(`/finding/${id}`)
export const getFindingById = id => api6.get(`/finding/${id}`)
export const getArchivedFindings = () => api6.get(`/finding/`)


const apis = {
    insertEvent, 
    getAllEvents, 
    updateEvent, 
    deleteEvent, 
    getEventById,
    getEventProgress, 
    insertAnalyst, 
    getAllAnalyst, 
    updateAnalyst, 
    deleteAnalyst, 
    getAnalystById,
    insertSystem,
    getAllSystems,
    updateSystem,
    updateSystemArchive,
    deleteSystem,
    getSystemById,
    getArchivedSystems,
    insertSubtask,
    getAllSubtask,
    updateSubtask,
    deleteSubtask,
    getSubtaskById,
    getSubtaskByTask,
    updateSubtaskArchive,
    getArchivedSubtasks,
    insertTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getTaskById,
    getTaskBySystem,
    getTasksByDate,
    getTasksByDateLate,
    updateTaskArchive,
    getArchivedTasks,
    insertFinding, 
    getAllFindings,
    updatefinding,
    updatefindingarchive,
    deleteFinding,
    getFindingById,
    getArchivedFindings
}

export default apis