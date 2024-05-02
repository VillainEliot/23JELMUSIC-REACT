import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

class Eleves extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataEleves: [],
            showModifierModal: false,
            showAjouterModal: false,
            showConfirmationModal: false,

        };
    }

    componentDidMount() {
        this.fetchElevesLister();
    }

    fetchElevesLister = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/eleve/lister/');

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const jsonData = await response.json();
            this.setState({ dataEleves: jsonData });
            console.log('success', jsonData);
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataEleves}
                    renderItem={({ item }) => (
                        <View style={styles.eleveItem}>
                            <Text style={styles.nomPrenom}>{item.nom} {item.prenom}</Text>
                            <Text>Résidence: {item.numRue} {item.rue}, {item.copos} {item.ville}</Text>
                            <Text>Téléphone: {item.tel}</Text>
                            <Text>Mail: {item.mail}</Text>
                            <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={[styles.button, {width: '30%', marginBottom: 0, marginTop: 10}]}
                                    onPress={() => {
                                        this.setState({ showConfirmationModal: true, coursIdToDelete: item.id });
                                    }}
                                >
                                    <Text style={styles.buttonText}>Contrats</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, {width: '30%', marginBottom: 0, marginTop: 10}]}
                                    onPress={() =>
                                        this.setState({
                                            showModifierModal: true,
                                            coursIdToModify: item.id,
                                            ageMini: item.AgeMini.toString(),
                                            ageMaxi: item.AgeMaxi.toString(),
                                            heureDebut: getFormattedTime(item.HeureDebut),
                                            heureFin: getFormattedTime(item.HeureFin),
                                            nbPlaces: item.NbPlaces.toString(),
                                            jourCours: item.jours.id,
                                            professeur: item.professeur.id,
                                            typeInstruments: item.typeInstruments.id,
                                        })
                                    }
                                >
                                    <Text style={styles.buttonText}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, {width: '30%', marginBottom: 0, marginTop: 10}]}
                                    onPress={() => {
                                        this.setState({ showConfirmationModal: true, coursIdToDelete: item.id });
                                    }}
                                >
                                    <Text style={styles.buttonText}>Supprimer</Text>
                                </TouchableOpacity>

                            </View>
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
        backgroundColor: '#fff',
        width: '100%'
    },
    eleveItem: {
        backgroundColor: '#e3e3e3',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    nomPrenom: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    button: {
        height: 50,
        backgroundColor: 'rgb(0, 123, 255)',
        width: '100%',
        borderRadius: 10,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Eleves;