import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, TextInput, Modal, Button } from "react-native";

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [title] = useState("Press Me!");
    const [editingItem, setEditingItem] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");

    const onPress = () => {
        console.log("on press");
    };

    const fetchData = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteItem = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setNewTitle(item.title);
        setNewBody(item.body);
        setModalVisible(true);
    };

    const saveEdit = () => {
        const updatedData = data.map((item) =>
            item.id === editingItem.id ? { ...item, title: newTitle, body: newBody } : item
        );
        setData(updatedData);
        setModalVisible(false);
        setEditingItem(null);
        setNewTitle("");
        setNewBody("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text>Another Title</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text>{item.body}</Text>
                            <View style={styles.buttonContainer}>
                                <Button title="Edit" onPress={() => openEditModal(item)} />
                                <Button title="Delete" onPress={() => deleteItem(item.id)} color="red" />
                            </View>
                        </View>
                    )}
                />
            )}

            {editingItem && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text>Edit Item</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Body"
                            value={newBody}
                            onChangeText={setNewBody}
                        />
                        <Button title="Save" onPress={saveEdit} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    titleText: {
        fontSize: 24,
        marginBottom: 20,
    },
    itemContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        width: "100%",
    },
    itemTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        width: "100%",
        padding: 10,
    },
});
