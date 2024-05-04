import React from 'react';
import {Button, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

class Cours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCours: [],
            showModifierModal: false,
            showAjouterModal: false,
            showListeInscriptionModal: false,
            coursIdToModify: null,
            coursIdToInscription: null,
            ageMini: '',
            ageMaxi: '',
            heureDebut: '',
            heureFin: '',
            nbPlaces: '',
            professeur: 1,
            professeurs: [],// Liste des professeur disponibles récupérés de l'API
            jourCours: 1,
            joursDisponibles: [], // Liste des jours disponibles récupérés de l'API
            typeInstruments: 1,
            typesInstruments: [], // Liste des insturments disponibles récupérés de l'API
            dataEleves: [], // Liste des élèves récupérés de l'API
            dataInscription: [], // Liste les inscriptions d'un cours récupérés de l'API
            showConfirmationModal: false,
            coursIdToDelete: null,
        };
    }

    componentDidMount() {
        this.fetchCoursLister();
        this.fetchElevesLister();
        this.fetchProfesseurs();
        this.fetchJours();
        this.fetchTypesInstruments();
    }

    // Liste des insturments disponibles récupérés de l'API
    fetchTypesInstruments = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/typeinstruments/lister');
            if (!response.ok) {
                throw new Error('Failed to fetch type instruments');
            }
            const json = await response.json();
            this.setState({ typesInstruments: json });
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };

    // Liste des jours disponibles récupérés de l'API
    fetchJours = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/jours/lister');
            if (!response.ok) {
                throw new Error('Failed to fetch jours');
            }
            const json = await response.json();
            this.setState({ joursDisponibles: json });
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };

    // Liste des professeur disponibles récupérés de l'API
    fetchProfesseurs = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/professeur/lister');
            if (!response.ok) {
                throw new Error('Failed to fetch professeurs');
            }
            const json = await response.json();
            this.setState({ professeurs: json });
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };

    // Liste les cours disponibles récupérés de l'API
    fetchCoursLister = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/cours/lister/');

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const jsonData = await response.json();
            this.setState({ dataCours: jsonData });
            console.log('success', jsonData);
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

    // Supprime un cours
    fetchCoursDelete = async (id) => {
        try {
            const url = `http://api.holamama.fr/cours/supprimer/${id}`;
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
                coursIdToDelete: null,
            });

            // Recharger la liste des cours
            await this.fetchCoursLister();
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

    // Modifi un cours
    fetchCoursModifier = async () => {
        const {
            coursIdToModify,
            ageMini,
            ageMaxi,
            heureDebut,
            heureFin,
            nbPlaces,
            typeCours,
            jourCours,
            professeur,
            typeInstruments
        } = this.state;

        try {
            const url = `http://api.holamama.fr/cours/modifier/${coursIdToModify}?age_mini=${ageMini}&age_maxi=${ageMaxi}&heure_debut=${heureDebut}&heure_fin=${heureFin}&nb_places=${nbPlaces}&typeCours=1&jours=${jourCours}&professeur=${professeur}&typeInstruments=${typeInstruments}`;

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

            // Fermer le formulaire et recharger la liste des cours
            this.setState({
                showModifierModal: false,
                coursIdToModify: null,
                ageMini: '',
                ageMaxi: '',
                heureDebut: '',
                heureFin: '',
                nbPlaces: '',
                typeCours: '',
                jourCours: '',
                professeur: '',
                typeInstruments: ''
            });

            await this.fetchCoursLister(); // Recharger la liste des cours après la modification
        } catch (error) {
            console.error('Error updating cours:', error);
        }
    };

    // Remet à zero les varaibles
    fetchCancel = async () =>{
        // Fermer le formulaire et recharger la liste des cours
        this.setState({
            showAjouterModal: false,
            showModifierModal: false,
            coursIdToModify: null,
            ageMini: '',
            ageMaxi: '',
            heureDebut: '',
            heureFin: '',
            nbPlaces: '',
            typeCours: '',
            jourCours: 1,
            professeur: 1,
            typeInstruments: 1
        });

        await this.fetchCoursLister(); // Recharger la liste des cours après la modification
    }

    // Ajout un cours
    fetchCoursAjouter = async () => {
        const {
            ageMini,
            ageMaxi,
            heureDebut,
            heureFin,
            nbPlaces,
            typeCours,
            jourCours,
            professeur,
            typeInstruments
        } = this.state;

        try {
            const url = `http://api.holamama.fr/cours/ajouter?age_mini=${ageMini}&age_maxi=${ageMaxi}&heure_debut=${heureDebut}&heure_fin=${heureFin}&nb_places=${nbPlaces}&typeCours=1&jours=${jourCours}&professeur=${professeur}&typeInstruments=${typeInstruments}`;

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
                coursIdToModify: null,
                ageMini: '',
                ageMaxi: '',
                heureDebut: '',
                heureFin: '',
                nbPlaces: '',
                typeCours: '',
                jourCours: 1,
                professeur: 1,
                typeInstruments: 1
            });

            await this.fetchCoursLister(); // Recharger la liste des cours après la modification
        } catch (error) {
            console.error('Error adding cours:', error);
        }
    };

    //Lister les élèves
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

    //Lister les inscriptions
    fetchInscriptionLister = async (id) => {
        this.setState({
            showListeInscriptionModal: true,
            coursIdToInscription: id,
        })
        try {
            const response = await fetch(`http://api.holamama.fr/inscription/lister/${id}`);

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const jsonData = await response.json();
            this.setState({ dataInscription: jsonData });
            console.log('success', jsonData);
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

    render() {
        const getFormattedTime = (dateTimeString) => {
            return dateTimeString[11] + dateTimeString[12] + dateTimeString[13] + dateTimeString[14] + dateTimeString[15];
        };

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
                    data={this.state.dataCours}
                    renderItem={({ item }) => (
                        <View style={styles.coursItem}>
                            <TouchableOpacity
                                style={[styles.button, {width: 'auto', padding: 4, marginBottom: 0, marginTop: 10, height: 30, position: 'absolute', right: 10, zIndex: 1}]}
                                onPress={() =>
                                    this.fetchInscriptionLister(item.id)
                                }
                            >
                                <Text style={styles.buttonText}>Inscriptions élèves</Text>
                            </TouchableOpacity>
                            <Text>Jour: {item.jours.libelle}</Text>
                            <Text>Heures: {getFormattedTime(item.HeureDebut)} - {getFormattedTime(item.HeureFin)}</Text>
                            <Text>Âges: {item.AgeMini} - {item.AgeMaxi}</Text>
                            <Text>Places disponibles: {item.NbPlaces}</Text>
                            <Text>Professeur: {item.professeur.nom} {item.professeur.prenom}</Text>
                            <Text>Instrument: {item.typeInstruments.libelle}</Text>
                            {/* Bouton "Modifier" qui ouvre le formulaire de modification */}

                            <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={[styles.button, {width: '45%', marginBottom: 0, marginTop: 10, height: 40}]}
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
                                    style={[styles.button, {width: '45%', marginBottom: 0, marginTop: 10, height: 40}]}
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

                {/* Modal de confirmation de suppression */}
                <Modal
                    visible={this.state.showConfirmationModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={[styles.modalContainer, {height: '100%',}]}>
                        <Text style={styles.modalTitle}>Confirmer la suppression</Text>
                        <Text style={{ marginBottom: 20 }}>
                            Êtes-vous sûr de vouloir supprimer ce cours ?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%' }}>
                            <Button
                                title="Oui"
                                onPress={() => {
                                    this.fetchCoursDelete(this.state.coursIdToDelete);
                                }}
                            />
                            <Button
                                title="Non"
                                onPress={() => {
                                    this.setState({ showConfirmationModal: false, coursIdToDelete: null });
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
                        {/* Sélecteur de professeur */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Professeur :</Text>
                            <Picker
                                selectedValue={this.state.professeur}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ professeur: itemValue })
                                }
                            >
                                {this.state.professeurs.map((professeur) => (
                                    <Picker.Item
                                        key={professeur.id}
                                        label={`${professeur.nom} ${professeur.prenom}`}
                                        value={professeur.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        {/* Sélecteur de jour */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Jour du cours :</Text>
                            <Picker
                                selectedValue={this.state.jourCours}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ jourCours: itemValue })
                                }
                            >
                                {this.state.joursDisponibles.map((jour) => (
                                    <Picker.Item key={jour.id} label={jour.libelle} value={jour.id} />
                                ))}
                            </Picker>
                        </View>
                        {/* Sélecteur d'instrument */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Type d'instrument :</Text>
                            <Picker
                                selectedValue={this.state.typeInstruments}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ typeInstruments: itemValue })
                                }
                            >
                                {this.state.typesInstruments.map((typeInstruments) => (
                                    <Picker.Item
                                        key={typeInstruments.id}
                                        label={typeInstruments.libelle}
                                        value={typeInstruments.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.fetchCoursModifier}
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
                        <Text style={styles.modalTitle}>Ajouter un cours :</Text>
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
                        {/* Sélecteur de professeur */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Professeur :</Text>
                            <Picker
                                selectedValue={this.state.professeur}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ professeur: itemValue })
                                }
                            >
                                {this.state.professeurs.map((professeur) => (
                                    <Picker.Item
                                        key={professeur.id}
                                        label={`${professeur.nom} ${professeur.prenom}`}
                                        value={professeur.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        {/* Sélecteur de jour */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Jour du cours :</Text>
                            <Picker
                                selectedValue={this.state.jourCours}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ jourCours: itemValue })
                                }
                            >
                                {this.state.joursDisponibles.map((jour) => (
                                    <Picker.Item key={jour.id} label={jour.libelle} value={jour.id} />
                                ))}
                            </Picker>
                        </View>
                        {/* Sélecteur d'instrument */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Type d'instrument :</Text>
                            <Picker
                                selectedValue={this.state.typeInstruments}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ typeInstruments: itemValue })
                                }
                            >
                                {this.state.typesInstruments.map((typeInstruments) => (
                                    <Picker.Item
                                        key={typeInstruments.id}
                                        label={typeInstruments.libelle}
                                        value={typeInstruments.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.fetchCoursAjouter}
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

                {/* Modal inscription des cours */}
                <Modal
                    visible={this.state.showListeInscriptionModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={{backgroundColor: '#fff',width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[{width: '100%', margin:'auto 0 auto 0', textAlign: 'center', fontSize: 18}]}>Élèves inscrits</Text>
                    </View>
                    <FlatList
                        data={this.state.dataInscription}
                        contentContainerStyle={styles.container}
                        renderItem={({ item }) => (
                            <View style={styles.coursItem}>
                                <Text>{item.eleve.nom} {item.eleve.prenom}</Text>
                                {/* Bouton "Modifier" qui ouvre le formulaire de modification */}

                                <View style={{display: 'flex'}}>
                                    <TouchableOpacity
                                        style={[styles.button, {width: '45%', marginBottom: 0, marginTop: 10, height: 40}]}
                                        onPress={() => {
                                            // a faire la suppretion de l'insctiption
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Supprimer</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

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
