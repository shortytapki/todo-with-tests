import { StoreProvider } from "../store/Store";
import { Tabs } from "@components/Tabs";
import { Form } from "@components/Form";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../style/global.css";

function AppUI() {
  return (
    <>
      <h1>Todos</h1>
      <Form />
      <Tabs />
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppUI />
    </StoreProvider>
  );
}

export { App };
