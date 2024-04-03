import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const Inscription = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.logoText}>23JELMUSIC</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
                <Button
                    title="Connexion"
                    onPress={handleRegister}
                    buttonStyle={styles.button}
                />
                <TextInput>Si vous avez déjà un compte</TextInput>
                <TextInput>Veuillez vous connecter !</TextInput>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        width: 200,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#5d87ff',
    },
    button: {
        marginTop: 10,
    },
});

export default Inscription;