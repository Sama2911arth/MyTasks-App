import React from 'react';
import { StatusBar } from 'expo-status-bar';
import TaskScreen from './src/screens/TaskScreen';

export default function App() {
  return (
    <>
      <TaskScreen />
      <StatusBar style="auto" />
    </>
  );
}