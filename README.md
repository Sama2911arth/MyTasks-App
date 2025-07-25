# My Tasks - React Native App

A simple and elegant task management application built with React Native and Expo. It allows users to manage their daily tasks with local notifications to remind them.

## Features

- **Add Tasks**: Quickly add new tasks through a clean input interface.
- **View Tasks**: See all your tasks in a scrollable list.
- **Toggle Completion**: Mark tasks as complete with a single tap. Completed tasks are visually distinguished (strikethrough).
- **Delete Tasks**: Remove tasks you no longer need.
- **Local Notifications**: Each new task schedules a local notification to remind you 10 seconds after creation.
- **Notification Cancellation**: Marking a task as complete automatically cancels its pending notification.
- **Data Persistence**: Your tasks are saved locally on your device and will be there when you reopen the app, thanks to `AsyncStorage`.

## Tech Stack

- **React Native**: Core framework for building the mobile app.
- **Expo**: Platform for building and running the app, including the Expo Go client for development.
- **Expo Notifications**: For scheduling and managing local push notifications.
- **AsyncStorage**: For persisting task data locally on the device.
- **JavaScript (ES6+)**: The primary programming language.
- **React Hooks**: `useState` and `useEffect` for state management and side effects.

## How to Run the Project

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo Go](https://expo.dev/go) app on your iOS or Android device.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd my-tasks-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npx expo start
    ```

4.  **Run on your device:**
    - Scan the QR code displayed in the terminal using the Expo Go app on your phone.
    - The app will bundle and launch.

**Note on Notifications**: Local notifications are best tested on a physical device. They may not work as expected on simulators/emulators.

## Project Structure

The project follows a feature-based structure to keep the code organized and scalable.