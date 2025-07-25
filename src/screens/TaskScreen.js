import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, scheduleTaskNotification, cancelNotification } from '../utils/notifications';

import AddTask from '../components/AddTask';
import TaskItem from '../components/TaskItem';

const STORAGE_KEY = 'tasks';

const TaskScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [notificationToken, setNotificationToken] = useState('');
    const appState = useRef(AppState.currentState);

    // Load tasks from storage and register for notifications on initial render
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setNotificationToken(token || ''));
        loadTasks();

        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground!');
                // You can add logic here if needed when the app returns
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // Save tasks to storage whenever the tasks state changes
    useEffect(() => {
        saveTasks();
    }, [tasks]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedTasks !== null) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to load tasks.');
        }
    };

    const saveTasks = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (e) {
            Alert.alert('Error', 'Failed to save tasks.');
        }
    };

    const handleAddTask = async (text) => {
        const newTask = {
            id: Date.now().toString(),
            text,
            completed: false,
            notificationId: null,
        };

        const notificationId = await scheduleTaskNotification(newTask);
        newTask.notificationId = notificationId;

        setTasks(prevTasks => [newTask, ...prevTasks]);
    };

    const handleToggleTask = async (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === id) {
                    const updatedTask = { ...task, completed: !task.completed };
                    // If task is completed, cancel its notification
                    if (updatedTask.completed && updatedTask.notificationId) {
                        cancelNotification(updatedTask.notificationId);
                        updatedTask.notificationId = null; // Clear the ID
                    }
                    return updatedTask;
                }
                return task;
            })
        );
    };

    const handleDeleteTask = (id) => {
        const taskToDelete = tasks.find(task => task.id === id);
        if (taskToDelete && taskToDelete.notificationId) {
            cancelNotification(taskToDelete.notificationId);
        }
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Tasks</Text>
            <AddTask onAddTask={handleAddTask} />
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                    />
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add one!</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#f4f7fe',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#999',
    },
});

export default TaskScreen;