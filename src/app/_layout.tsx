import StackNavigator from "../presentation/navigation/StackNavigator";
import { ThemeContextProvider } from "../presentation/context/ThemeContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
          <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
