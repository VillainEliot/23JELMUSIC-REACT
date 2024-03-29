import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class ContratsPrets extends React.Component {
    render() {
        const contratsData = [
            { eleve: 'John Doe', responsables: ['Jane Doe', 'Alice Smith'], instrument: 'Guitare', typeInstrument: 'Acoustique', dateDebut: '01/03/2024', dateFin: '01/06/2024' },
            { eleve: 'Alice Smith', responsables: ['Bob Smith'], instrument: 'Piano', typeInstrument: 'Numérique', dateDebut: '15/04/2024', dateFin: '15/07/2024' },
        ];

        return (
            <View style={styles.container}>
                <FlatList
                    data={contratsData}
                    renderItem={({ item }) => (
                        <View style={styles.contratItem}>
                            <Text>Élève: {item.eleve}</Text>
                            <Text>Responsables: {item.responsables.join(', ')}</Text>
                            <Text>Instrument: {item.instrument}</Text>
                            <Text>Type d'instrument: {item.typeInstrument}</Text>
                            <Text>Date de début: {item.dateDebut}</Text>
                            <Text>Date de fin: {item.dateFin}</Text>
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
    contratItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default ContratsPrets;