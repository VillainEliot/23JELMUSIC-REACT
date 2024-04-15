import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from "axios";

class Cours extends React.Component {

    componentDidMount() {
        this.fetchCoursLister();
        this.coursListerData = "";
        console.log("1");
    }

    fetchCoursLister() {


        console.log("2");
        const request = new XMLHttpRequest();
        request.onreadystatechange = e => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                console.log('success', request.responseText);
                this.coursListerData = request.responseText;
            } else {
                console.warn('error');
            }
        };

        request.open('GET', 'https://api.holamama.fr/cours/lister');
        request.send();

    }

    render() {
        console.log("3");
        console.log(this.coursListerData);
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.coursListerData}
                    renderItem={({ item }) => (
                        <View style={styles.coursItem}>
                            <Text style={styles.instrument}>{item.id}</Text>
                            <Text>Jour: {item.jours.libelle}</Text>
                            <Text>Heure de début: {item.HeureDebut}</Text>
                            <Text>Heure de fin: {item.HeureFin}</Text>
                            <Text>Âge minimum: {item.AgeMini}</Text>
                            <Text>Âge maximum: {item.AgeMaxi}</Text>
                            <Text>Places disponibles: {item.NbPlaces}</Text>
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