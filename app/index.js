import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import moment from 'moment';

const App = () => {
  const [todos, setTodos] = useState([]); 
  const [newTodo, setNewTodo] = useState(''); 

  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        const processedTodos = data.map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
          created_at: moment().format(),
          updated_at: moment().format(),
        }));
        setTodos(processedTodos);
      });
  }, []);

  
  const addTodo = () => {
    if (!newTodo.trim()) return; 
    const newTodoItem = {
      id: Date.now(), 
      title: newTodo,
      completed: false,
      created_at: moment().format(),
      updated_at: moment().format(),
    };
    setTodos([newTodoItem, ...todos]); 
    setNewTodo(''); 
  };

  
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updated_at: moment().format() }
          : todo
      )
    );
  };

  
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Add TODO Section */}
      <View style={styles.addTodo}>
        <TextInput
          style={styles.input}
          placeholder="Add new TODO"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Add" onPress={addTodo} />
      </View>

      {/* TODO List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text
              style={{
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}
            >
              {item.title}
            </Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => toggleTodo(item.id)}>
                <Text>{item.completed ? 'Undo' : 'Done'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  addTodo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginRight: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
});

export default App;
