import { Stack } from 'expo-router'

const StackNavigator = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" options={{title: 'Home'}}/>
      <Stack.Screen name="pokemon" options={{title: 'Pokemon'}}/>
      <Stack.Screen name="search" options={{title: 'Search'}}/>
    </Stack>
  )
}
export default StackNavigator