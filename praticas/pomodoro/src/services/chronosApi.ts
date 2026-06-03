import api from './api'

export async function getSettings() {
  const response = await api.get('/settings')
  return response.data
}

export async function updateSettings(data: {
  workTime: number
  shortBreakTime: number
  longBreakTime: number
}) {
  const response = await api.put('/settings', data)
  return response.data
}

export async function getTasks() {
  const response = await api.get('/tasks')
  return response.data
}

interface CreateTaskDTO {
  id: string
  name: string
  duration: number
  type: string
  startDate: number
}

export async function createTask(data: CreateTaskDTO) {
  const response = await api.post('/tasks', data)
  return response.data
}

export async function completeTask(
  id: string,
  completeDate: number,
) {
  const response = await api.patch(
    `/tasks/${id}/complete`,
    { completeDate },
  )

  return response.data
}

export async function interruptTask(
  id: string,
  interruptDate: number,
) {
  const response = await api.patch(
    `/tasks/${id}/interrupt`,
    { interruptDate },
  )

  return response.data
}

export async function clearTasks() {
  await api.delete('/tasks')
}
console.log('chronosApi carregado')