import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class Cours extends React.Component {
    render() {
        const coursData = [
            { instrument: 'Piano', jour: 'Lundi', heureDebut: '10:00', heureFin: '12:00', ageMin: 6, ageMax: 99, placesDisponibles: 5 },
            { instrument: 'Guitare', jour: 'Mardi', heureDebut: '14:00', heureFin: '16:00', ageMin: 8, ageMax: 99, placesDisponibles: 3 },
            { instrument: 'Violon', jour: 'Mercredi', heureDebut: '16:00', heureFin: '18:00', ageMin: 7, ageMax: 99, placesDisponibles: 7 },
        ];

        return (
            <View style={styles.container}>
                <FlatList
                    data={coursData}
                    renderItem={({ item }) => (
                        <View style={styles.coursItem}>
                            <Text style={styles.instrument}>{item.instrument}</Text>
                            <Text>Jour: {item.jour}</Text>
                            <Text>Heure de début: {item.heureDebut}</Text>
                            <Text>Heure de fin: {item.heureFin}</Text>
                            <Text>Âge minimum: {item.ageMin}</Text>
                            <Text>Âge maximum: {item.ageMax}</Text>
                            <Text>Places disponibles: {item.placesDisponibles}</Text>
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
    coursItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    instrument: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Cours;