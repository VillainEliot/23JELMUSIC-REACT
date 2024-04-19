import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios"; // Assurez-vous d'inclure Picker ici

class Cours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCours: [],
            showModifierModal: false,
            coursIdToModify: null,
            ageMini: '',
            ageMaxi: '',
            heureDebut: '',
            heureFin: '',
            nbPlaces: '',
            jourCours: '', // Jour du cours
            joursDisponibles: [
                {"id":1, "libelle": "Lundi"},
                {"id":2, "libelle": "Mardi"},
                {"id":3, "libelle": "Mercredi"},
                {"id":4, "libelle": "Jeudi"},
                {"id":5, "libelle": "Vendredi"},
            ] // Liste des jours disponibles récupérés de l'API
        };
    }

    componentDidMount() {
        this.fetchCoursLister();
    }

    fetchCoursLister = async () => {
        try {
            const response = await axios.get('https://api.holamama.fr/cours/lister');
            const data = response.data;
            this.setState({ dataCours: data });
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ dataCours: [] });
        }
    };

    fetchCoursModifier = async () => {
        const {
            coursIdToModify,
            ageMini,
            ageMaxi,
            heureDebut,
            heureFin,
            nbPlaces,
            jourCours
        } = this.state;

        try {
            const response = await axios.post(`https://vps.holamama.fr/cours/modifier/${coursIdToModify}`, {
                age_mini: ageMini,
                age_maxi: ageMaxi,
                heure_debut: heureDebut,
                heure_fin: heureFin,
                nb_places: nbPlaces,
                typeCours: 1,
                jours: jourCours, // Jour du cours
                professeur: 1,
                typeInstruments: 1
            });

            console.log('Course updated successfully:', response.data);

            // Fermer le formulaire et recharger la liste des cours
            this.setState({
                showModifierModal: false,
                coursIdToModify: null,
                ageMini: '',
                ageMaxi: '',
                heureDebut: '',
                heureFin: '',
                nbPlaces: '',
                jourCours: ''
            });

            this.fetchCoursLister();
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataCours}
                    renderItem={({ item }) => (
                        <View style={styles.coursItem}>
                            <Text style={styles.instrument}>{item.id}</Text>
                            <Text>Jour: {item.jours.libelle}</Text>
                            <Text>Heure de début: {item.HeureDebut}</Text>
                            <Text>Heure de fin: {item.HeureFin}</Text>
                            <Text>Âge minimum: {item.AgeMini}</Text>
                            <Text>Âge maximum: {item.AgeMaxi}</Text>
                            <Text>Places disponibles: {item.NbPlaces}</Text>
                            {/* Bouton "Modifier" qui ouvre le formulaire de modification */}
                            <Button
                                title="Modifier"
                                onPress={() =>
                                    this.setState({
                                        showModifierModal: true,
                                        coursIdToModify: item.id,
                                        ageMini: item.AgeMini.toString(),
                                        ageMaxi: item.AgeMaxi.toString(),
                                        heureDebut: item.HeureDebut,
                                        heureFin: item.HeureFin,
                                        nbPlaces: item.NbPlaces.toString(),
                                        jourCours: item.jours.libelle
                                    })
                                }
                            />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* Modal pour le formulaire de modification */}
                <Modal
                    visible={this.state.showModifierModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Modifier le cours :</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Âge minimum :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Âge minimum"
                                value={this.state.ageMini}
                                onChangeText={(text) => this.setState({ ageMini: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Âge maximum :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Âge maximum"
                                value={this.state.ageMaxi}
                                onChangeText={(text) => this.setState({ ageMaxi: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Heure de début (HH:mm) :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Heure de début (HH:mm)"
                                value={this.state.heureDebut}
                                onChangeText={(text) => this.setState({ heureDebut: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Heure de fin (HH:mm) :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Heure de fin (HH:mm)"
                                value={this.state.heureFin}
                                onChangeText={(text) => this.setState({ heureFin: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Places disponibles :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Places disponibles"
                                value={this.state.nbPlaces}
                                onChangeText={(text) => this.setState({ nbPlaces: text })}
                            />
                        </View>
                        {/* Sélecteur de jour */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Jour du cours :</Text>
                            <Picker
                                selectedValue={this.state.jourCours}
                                style={{ height: 50, width: '100%', marginBottom: 20 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ jourCours: itemValue })
                                }
                            >
                                {this.state.joursDisponibles.map((jour) => (
                                    <Picker.Item key={jour.id} label={jour.libelle} value={jour.libelle} />
                                ))}
                            </Picker>
                        </View>
                        <Button
                            title="Valider"
                            style={{ height: 50, width: '80%', marginBottom: 20 }}
                            onPress={this.fetchCoursModifier}
                        />
                        <Button
                            title="Annuler"
                            style={{ height: 50, width: '80%', marginBottom: 20 }}
                            onPress={() => this.setState({ showModifierModal: false })}
                        />
                    </View>
                </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '70%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        borderStyle: "solid"
    },
    label: {
        width: '40%', // Ajuster la largeur en fonction de vos besoins
        marginRight: 10,
        textAlign: 'right',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default Cours;
