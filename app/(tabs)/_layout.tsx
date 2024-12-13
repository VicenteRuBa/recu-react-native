import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./index"; 

const Tab = createBottomTabNavigator();

export default function Layout() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            
        </Tab.Navigator>
    );
}
