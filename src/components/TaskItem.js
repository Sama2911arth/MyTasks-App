import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.taskContainer}>
                <Ionicons
                    name={task.completed ? 'checkbox' : 'checkbox-outline'}
                    size={24}
                    color={task.completed ? '#aaa' : '#007BFF'}
                />
                <Text style={[styles.text, task.completed && styles.completedText]}>
                    {task.text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(task.id)}>
                <Ionicons name="trash-bin-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        marginLeft: 15,
        fontSize: 16,
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
});

export default TaskItem;