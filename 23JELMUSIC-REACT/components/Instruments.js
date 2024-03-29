import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class Instruments extends React.Component {
    render() {
        const instrumentsData = [
            { nom: 'Guitare acoustique', marque: 'Fender', classe: 'A', numSerie: '123456', dateAchat: '10/02/2023', prixAchat: '$500', utilisation: 'Prêt', couleurs: ['Noir', 'Naturel'] },
            { nom: 'Piano numérique', marque: 'Yamaha', classe: 'B', numSerie: '789012', dateAchat: '05/05/2022', prixAchat: '$1000', utilisation: 'Pas prêt', couleurs: ['Blanc', 'Noir'] },
        ];

        return (
            <View style={styles.container}>
                <FlatList
                    data={instrumentsData}
                    renderItem={({ item }) => (
                        <View style={styles.instrumentItem}>
                            <Text style={styles.instrumentName}>{item.nom}</Text>
                            <Text>Marque: {item.marque}</Text>
                            <Text>Classe: {item.classe}</Text>
                            <Text>Numéro de série: {item.numSerie}</Text>
                            <Text>Date d'achat: {item.dateAchat}</Text>
                            <Text>Prix d'achat: {item.prixAchat}</Text>
                            <Text>Utilisation: {item.utilisation}</Text>
                            <Text>Couleurs: {item.couleurs.join(', ')}</Text>
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
    instrumentItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    instrumentName: {
        fontWeight: 'bold',
    },
});

export default Instruments;