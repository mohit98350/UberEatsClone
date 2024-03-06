import App from "./App";
import { AppRegistry } from "react-native";

// "project" is the name of the main react-native Folder
// the second argument is an arrow function returning
// App, which is imported above
AppRegistry.registerComponent("UberEatsUser", () => App);

// runApplication() loads the javascript bundle
// and runs the app.
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});
