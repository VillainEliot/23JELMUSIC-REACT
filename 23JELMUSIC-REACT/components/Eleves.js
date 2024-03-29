import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class Eleves extends React.Component {
    render() {
        const elevesData = [
            { nom: 'Doe', prenom: 'John', ville: 'New York', telephone: '1234567890', mail: 'john.doe@example.com' },
            { nom: 'Smith', prenom: 'Jane', ville: 'Los Angeles', telephone: '0987654321', mail: 'jane.smith@example.com' },
        ];

        return (
            <View style={styles.container}>
                <FlatList
                    data={elevesData}
                    renderItem={({ item }) => (
                        <View style={styles.eleveItem}>
                            <Text style={styles.nomPrenom}>{item.nom} {item.prenom}</Text>
                            <Text>Ville: {item.ville}</Text>
                            <Text>Téléphone: {item.telephone}</Text>
                            <Text>Mail: {item.mail}</Text>
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
    eleveItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    nomPrenom: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Eleves;