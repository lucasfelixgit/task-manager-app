import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

function TaskItem({ task }) {
  return (
    <View style={styles.taskBg}>
      <Text style={styles.taskText}>{task}</Text>
    </View>
  )
}

export default function App() {

  const [newTask, setNewTask] = useState('')
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks')

      if (savedTasks !== null) {
        setTaskList(JSON.parse(savedTasks))
      } 
      else {
        setTaskList([])
      }

    } catch (error) {
      console.log('(Erro) Não foi possível carregar as tarefas - ', error)
      setTaskList([])
    }
  }

  async function handleAddTask() {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks')
      let currentTasks

      if (savedTasks) {
        currentTasks = JSON.parse(savedTasks)
      } else {
        currentTasks = []
      }

      const updatedTaskList = [...currentTasks, newTask]

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTaskList))
      setTaskList(updatedTaskList)

    } catch (error) {
      console.log('(Erro) Não foi possível adicionar a tarefa - ', error)
    }
  }

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Tarefas App</Text>

      <TextInput
        style={styles.inputText}
        value={newTask}
        onChangeText={(value) => setNewTask(value)}
        placeholder={'Adicionar uma Tarefa'}
      />

      <TouchableOpacity style={styles.addBttn} onPress={() => handleAddTask()}>
        <Text style={styles.bttnText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <View style={styles.taskContainer}>
        {taskList.map((task, i) => (
          <TaskItem key={i} task={task} />
        ))}
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 35
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  
  inputText: {
    padding: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: '#D9D7DD',
    borderRadius: 5
  },
  
  addBttn: {
    width: '90%',
    height: 40,
    padding: 10,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#456990',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bttnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  taskContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },

  taskBg: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    width: '90%',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#D9D7DD',
  },

  taskText: {
    fontSize: 16,
    textAlign: 'left',
    width: '100%'
  }
})
