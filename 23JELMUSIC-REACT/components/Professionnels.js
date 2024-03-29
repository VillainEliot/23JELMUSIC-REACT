import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class Professionnels extends React.Component {
    render() {
        // Données factices pour les professionnels (à remplacer par vos propres données)
        const professionnelsData = [
            { nom: 'Jean Dupont', metier: 'Professeur de guitare', adresse: '123 Rue des Professeurs', telephone: '0123456789', email: 'jean.dupont@example.com' },
            { nom: 'Marie Martin', metier: 'Professeur de piano', adresse: '456 Avenue des Musiciens', telephone: '0987654321', email: 'marie.martin@example.com' },
            // Ajoutez d'autres professionnels ici
        ];

        return (
            <View style={styles.container}>
                <FlatList
                    data={professionnelsData}
                    renderItem={({ item }) => (
                        <View style={styles.professionnelItem}>
                            <Text style={styles.professionnelName}>{item.nom}</Text>
                            <Text>Métier: {item.metier}</Text>
                            <Text>Adresse: {item.adresse}</Text>
                            <Text>Téléphone: {item.telephone}</Text>
                            <Text>Email: {item.email}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    professionnelItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    professionnelName: {
        fontWeight: 'bold',
    },
});

export default Professionnels;