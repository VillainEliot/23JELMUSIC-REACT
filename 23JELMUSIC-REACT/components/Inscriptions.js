import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class Inscriptions extends React.Component {
    render() {
        // Données factices pour les inscriptions (à remplacer par vos propres données)
        const inscriptionsData = [
            { eleve: 'Alice Dupont', cours: 'Cours de guitare', jour: 'Lundi', dateInscription: '2024-03-28' },
            { eleve: 'Bob Martin', cours: 'Cours de piano', jour: 'Mercredi', dateInscription: '2024-03-29' },
            // Ajoutez d'autres inscriptions ici
        ];

        return (
            <View style={styles.container}>
                <FlatList
                    data={inscriptionsData}
                    renderItem={({ item }) => (
                        <View style={styles.inscriptionItem}>
                            <Text>Élève: {item.eleve}</Text>
                            <Text>Cours: {item.cours}</Text>
                            <Text>Jour du cours: {item.jour}</Text>
                            <Text>Date d'inscription: {item.dateInscription}</Text>
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
    inscriptionItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default Inscriptions;