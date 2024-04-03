import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class Connexion extends React.Component {
    render() {
        const Compte = [
            { nom: 'Doe', prenom: 'John', role: 'user' },
            { nom: 'Batien', prenom: 'Francis', role: 'adminsistrateur' },
        ];

        const handleLogin = async() => {
            if (!username || !password) {
                alert("Veuillez saisir un nom d'utilisateur et un mot de passe.");
                return;
            }

            // Simuler une requête asynchrone à un backend pour vérifier les informations d'identification
            try {
                // Simuler une attente de 1 seconde pour représenter une requête asynchrone
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Vérifier les informations d'identification
                if (username === 'utilisateur' && password === 'motdepasse') {
                    // Connexion réussie
                    alert("Connexion réussie!");
                } else {
                    // Identifiants invalides
                    alert("Nom d'utilisateur ou mot de passe incorrect.");
                }
            } catch (error) {
                // Gérer les erreurs de connexion
                console.error("Erreur de connexion:", error);
                alert("Une erreur s'est produite lors de la connexion.");
            }
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
                        onPress={handleLogin}
                        buttonStyle={styles.button}
                    />
                    <Button
                        title="Créer un compte"
                        onPress={handleRegister}
                        buttonStyle={[styles.button, { marginTop: 10 }]}
                    />
                </View>
            </View>
        );
    }
}

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

export default Connexion;