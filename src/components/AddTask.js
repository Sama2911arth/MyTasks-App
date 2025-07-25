import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddTask = ({ onAddTask }) => {
    const [text, setText] = useState('');

    const handleAddTask = () => {
        if (text.trim().length > 0) {
            onAddTask(text);
            setText('');
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Add a new task..."
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleAddTask}
            />
            <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
                <Ionicons name="add-circle" size={40} color="#007BFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingVertical: 5,
    },
    addButton: {
        marginLeft: 10,
    },
});

export default AddTask;