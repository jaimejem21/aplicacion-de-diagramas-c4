import { AuthContextProvider } from "./context/authContext";
import { SocketContextProvider } from "./context/socketContext";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <AppRouter />
      </SocketContextProvider>
    </AuthContextProvider>
  );
}

export default App;
