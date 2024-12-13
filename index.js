import { AppRegistry } from "react-native";
import App from "./app"; // Importa tu componente principal
import { name as appName } from "./app.json"; // Usa el nombre definido en app.json

AppRegistry.registerComponent(appName, () => App);
