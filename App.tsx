import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useCountStore from "./src/store/use-count.store";
import { useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  const countNumber = useCountStore((state) => state.count);
  const increaseCount = useCountStore((state) => state.increaseCount);
  const decreaseCount = useCountStore((state) => state.decreaseCount);
  const resetCount = useCountStore((state) => state.resetCount);

  const fetchData = useCountStore((state) => state.fetchData);

  const { isLoading, data } = useQuery(["allJobs", fetchData]);

  console.log(data);

  return (
    <QueryClientProvider client={queryClient}>
      <View>
        <Text>Test</Text>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
