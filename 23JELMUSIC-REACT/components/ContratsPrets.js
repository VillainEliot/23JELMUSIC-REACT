import React from 'react';
import {Button, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

class Cours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataContratPret: [],
            showModifierModal: false,
            showAjouterModal: false,
            contratPretIdToModify: null,
            dateDebut: '',
            dateFin: '',
            attestationAssurance: '',
            etatDetailleDebut: '',
            etatDetailleRetour: '',
            eleve: 1,
            eleves: [],
            instrument: 1,
            instruments: [],
            showConfirmationModal: false,
            contratPretIdToDelete: null,
        };
    }

    componentDidMount() {
        this.fetchContratPretLister();
        this.fetchEleveLister();
        this.fetchInstrumentLister();

    }

    fetchInstrumentLister = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/instrument/lister');
            if (!response.ok) {
                throw new Error('Failed to fetch type instruments');
            }
            const json = await response.json();
            this.setState({ instruments: json });
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };

    fetchEleveLister = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/eleve/lister');
            if (!response.ok) {
                throw new Error('Failed to fetch jours');
            }
            const json = await response.json();
            this.setState({ eleves: json });
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };

    fetchContratPretLister = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/contratPret/lister/');

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const jsonData = await response.json();
            this.setState({ dataContratPret: jsonData });
            console.log('success', jsonData);
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

    fetchContratPretDelete = async (id) => {
        try {
            const url = `http://api.holamama.fr/contratPret/supprimer/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const jsonData = await response.json();
            console.log('success', jsonData);

            // Fermer la modal de confirmation après la suppression
            this.setState({
                showConfirmationModal: false,
                contratPretIdToDelete: null,
            });

            // Recharger la liste des cours
            await this.fetchContratPretLister();
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

    // Modifi un cours
    fetchContratPretModifier = async () => {
        const {
            contratPretIdToModify,
            datedebut,
            dateFin,
            attestationAssurance,
            etatDetailleDebut,
            etatDetailleRetour,
            eleve,
            instrument
        } = this.state;

        try {
            const url = `http://vps.holamama.fr/contratPret/modifier/${contratPretIdToModify}?dateDebut=${datedebut}&dateFin=${dateFin}&attestationAssurance=${attestationAssurance}&etatDetailleDebut=${etatDetailleDebut}&etatDetailleRetour=${etatDetailleRetour}&eleve=${eleve}&instrument=${instrument}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Course updated successfully:', responseData);

            this.setState({
                showModifierModal: false,
                contratPretIdToModify: null,
                dateDebut: '',
                dateFin: '',
                attestationAssurance: '',
                etatDetailleDebut: '',
                etatDetailleRetour: '',
                eleve: '',
                instrument: ''
            });

            await this.fetchContratPretLister();
        } catch (error) {
            console.error('Error updating cours:', error);
        }
    };

    fetchCancel = async () =>{
        this.setState({
            showAjouterModal: false,
            showModifierModal: false,
            contratPretIdToModify: null,
            dateDebut: '',
            dateFin: '',
            attestationAssurance: '',
            etatDetailleDebut: '',
            etatDetailleRetour: '',
            eleve: 1,
            instrument: 1
        });

        await this.fetchContratPretLister();
    }

    // Ajout un cours
    fetchContratPretAjouter = async () => {
        const {
            datedebut,
            dateFin,
            attestationAssurance,
            etatDetailleDebut,
            etatDetailleRetour,
            eleve,
            instrument
        } = this.state;

        try {
            const url = `http://api.holamama.fr/contratPret/ajouter?dateDebut=${datedebut}&dateFin=${dateFin}&attestationAssurance=${attestationAssurance}&etatDetailleDebut=${etatDetailleDebut}&etatDetailleRetour=${etatDetailleRetour}&eleve=${eleve}&instrument=${instrument}`;
            //http://api.holamama.fr/contratPret/ajouter?dateDebut=2024-04-03&dateFin=2024-05-03&attestationAssurance=Assu.pdf&etatDetailleDebut=Neuf&etatDetailleRetour=Très Bon&eleve=1&instrument=1
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Cours added successfully:', responseData);

            // Fermer le formulaire et recharger la liste des cours
            this.setState({
                showAjouterModal: false,
                contratPretIdToModify: null,
                dateDebut: '',
                dateFin: '',
                attestationAssurance: '',
                etatDetailleDebut: '',
                etatDetailleRetour: '',
                eleve: 1,
                instrument: 1
            });

            await this.fetchContratPretLister();
        } catch (error) {
            console.error('Error adding cours:', error);
        }
    };

    render() {

        return (
            <View style={styles.container}>
                {/*Bouton flotant ajouter*/}
                <TouchableOpacity style={{
                    borderRadius: 100,
                    width: '15%',
                    aspectRatio: 1,
                    backgroundColor: 'rgb(56,86,121)',
                    position: 'absolute',
                    bottom: 30,
                    right: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 99,
                }}
                                  onPress={() => this.setState({ showAjouterModal: true })}>
                    <Text
                        style={{
                            fontSize: 30,
                            color: '#fff',
                        }}>+</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.dataContratPret}
                    renderItem={({ item }) => (
                        <View style={styles.coursItem}>
                            <Text>Date de début: {item.dateDebut}</Text>
                            <Text>Date de fin: {item.dateFin}</Text>
                            <Text>Attestation d'assurance: {item.attestationAssurance}</Text>
                            <Text>Etat de début: {item.etatDetailDebut}</Text>
                            <Text>Etat de Fin: {item.etatDetailleRetour}</Text>
                            <Text>Instrument: {item.instrument ? item.instrument.nom : 'N/A'}</Text>
                            <Text>Eleve: {item.eleve ? `${item.eleve.prenom} ${item.eleve.nom}` : 'N/A'}</Text>
                            {/* Bouton "Modifier" qui ouvre le formulaire de modification */}

                            <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={[styles.button, {width: '45%', marginBottom: 0, marginTop: 10, height: 40}]}
                                    onPress={() =>
                                        this.setState({
                                            showModifierModal: true,
                                            contratPretIdToModify: item.id,
                                            dateDebut: item.dateDebut,
                                            dateFin: item.dateDebut,
                                            attestationAssurance: item.attestationAssurance,
                                            etatDetailleDebut: item.etatDetailleDebut,
                                            etatDetailleRetour: item.etatDetailleRetour,
                                            eleve: item.eleve.id,
                                            instrument: item.instrument.id,
                                        })
                                    }
                                >
                                    <Text style={styles.buttonText}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, {width: '45%', marginBottom: 0, marginTop: 10, height: 40}]}
                                    onPress={() => {
                                        this.setState({ showConfirmationModal: true, contratPretIdToDelete: item.id });
                                    }}
                                >
                                    <Text style={styles.buttonText}>Supprimer</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* Modal de confirmation de suppression */}
                <Modal
                    visible={this.state.showConfirmationModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={[styles.modalContainer, {height: '100%',}]}>
                        <Text style={styles.modalTitle}>Confirmer la suppression</Text>
                        <Text style={{ marginBottom: 20 }}>
                            Êtes-vous sûr de vouloir supprimer ce contrat de prêt ?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%' }}>
                            <Button
                                title="Oui"
                                onPress={() => {
                                    this.fetchContratPretDelete(this.state.contratPretIdToDelete);
                                }}
                            />
                            <Button
                                title="Non"
                                onPress={() => {
                                    this.setState({ showConfirmationModal: false, contratPretIdToDelete: null });
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                {/* Modal pour le formulaire de modification */}
                <Modal
                    visible={this.state.showModifierModal}
                    transparent={true}
                    animationType="slide"
                >

                    <ScrollView contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Modifier le contrat de prêt :</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date de début :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Date de début du contrat"
                                value={this.state.dateDebut}
                                onChangeText={(text) => this.setState({ dateDebut: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date de fin :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Date de fin du contrat"
                                value={this.state.dateFin}
                                onChangeText={(text) => this.setState({ dateFin: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Attestation d'assurance :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Attestation d'assurance"
                                value={this.state.attestationAssurance}
                                onChangeText={(text) => this.setState({ attestationAssurance: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Etat au debut :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Etat au début du contrat"
                                value={this.state.etatDetailleDebut}
                                onChangeText={(text) => this.setState({ etatDetailleDebut: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Etat à la fin :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Etat à la du contrat"
                                value={this.state.etatDetailleRetour}
                                onChangeText={(text) => this.setState({ etatDetailleRetour: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Eleve :</Text>
                            <Picker
                                selectedValue={this.state.eleve}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ eleve: itemValue })
                                }
                            >
                                {this.state.eleves.map((eleve) => (
                                    <Picker.Item
                                        key={eleve.id}
                                        label={`${eleve.nom} ${eleve.prenom}`}
                                        value={eleve.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Instrument :</Text>
                            <Picker
                                selectedValue={this.state.instrument}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ eleve: itemValue })
                                }
                            >
                                {this.state.instruments.map((instrument) => (
                                    <Picker.Item
                                        key={instrument.id}
                                        label={`${instrument.nom}`}
                                        value={instrument.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.fetchContratPretModifier}
                        >
                            <Text style={styles.buttonText}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.fetchCancel()}
                        >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Modal>

                {/* Modal pour le formulaire d'ajout de cours */}
                <Modal
                    visible={this.state.showAjouterModal}
                    transparent={true}
                    animationType="slide"
                >

                    <ScrollView contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Ajouter un contrat de prêt :</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date de début :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Date de début du contrat"
                                value={this.state.dateDebut}
                                onChangeText={(text) => this.setState({ dateDebut: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date de fin :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Date de fin du contrat"
                                value={this.state.dateFin}
                                onChangeText={(text) => this.setState({ dateFin: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Attestation d'assurance :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Attestation d'assurance"
                                value={this.state.attestationAssurance}
                                onChangeText={(text) => this.setState({ attestationAssurance: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Etat au début :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Etat au début du contrat"
                                value={this.state.etatDetailleDebut}
                                onChangeText={(text) => this.setState({ etatDetailleDebut: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Etat à la fin :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Etat à la fin du contrat"
                                value={this.state.etatDetailleRetour}
                                onChangeText={(text) => this.setState({ etatDetailleRetour: text })}
                            />
                        </View>
                        {/* Sélecteur de professeur */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Eleve :</Text>
                            <Picker
                                selectedValue={this.state.eleve}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ eleve: itemValue })
                                }
                            >
                                {this.state.eleves.map((eleve) => (
                                    <Picker.Item
                                        key={eleve.id}
                                        label={`${eleve.nom} ${eleve.prenom}`}
                                        value={eleve.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        {/* Sélecteur de jour */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Instrument :</Text>
                            <Picker
                                selectedValue={this.state.instrument}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ instrument: itemValue })
                                }
                            >
                                {this.state.instruments.map((instrument) => (
                                    <Picker.Item
                                        key={instrument.id}
                                        label={`${instrument.nom}`}
                                        value={instrument.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.fetchContratPretAjouter}
                        >
                            <Text style={styles.buttonText}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.fetchCancel()}
                        >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Modal>
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
    coursItem: {
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
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
    },
    label: {
        marginBottom: 5,
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
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

export default Cours;