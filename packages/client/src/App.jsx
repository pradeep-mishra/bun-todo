import "./App.css";
import TodoPage from "./components/TodoPage";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoPage>
        <TodoList></TodoList>
      </TodoPage>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
