// import React from 'react';
// import { StyleSheet, View, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
// import axios from 'axios';
// import InstrumentForm from './InstrumentForm'; // Importer le composant du formulaire de modification

// class Instruments extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             instrumentsData: [],
//             loading: true,
//             error: null,
//             editingInstrumentId: null,
//             selectedInstrumentId: null,
//         };
//     }

//     componentDidMount() {
//         this.fetchInstrumentsData();
//     }

//     fetchInstrumentsData = () => {
//         axios.get('http://api.holamama.fr/instrument/lister')
//             .then(response => {
//                 this.setState({
//                     instrumentsData: response.data,
//                     loading: false,
//                     error: null,
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching instruments data:', error);
//                 this.setState({
//                     loading: false,
//                     error: 'Failed to fetch instruments data. Please try again later.',
//                 });
//             });
//     };

//     handleEditInstrument = (id) => {
//         this.setState({ editingInstrumentId: id });
//     };

//     handleCancelEdit = () => {
//         this.setState({ editingInstrumentId: null });
//     };

//     handleSaveInstrument = (modifiedInstrument) => {
//         const { id } = modifiedInstrument;
    
//         // Mettre à jour localement les données de l'instrument modifié
//         const updatedInstrumentsData = this.state.instrumentsData.map(item => {
//             if (item.id === id) {
//                 return modifiedInstrument;
//             }
//             return item;
//         });
//         this.setState({ instrumentsData: updatedInstrumentsData, editingInstrumentId: null });
        
//         // Construire l'URL de l'API pour la modification de l'instrument
//         const apiUrl = `http://api.holamama.fr/instrument/modifier/${id}?nom=${encodeURIComponent(modifiedInstrument.nom)}&num_serie=${encodeURIComponent(modifiedInstrument.numSerie)}&prix_achat=${encodeURIComponent(modifiedInstrument.prixAchat)}&marque_id=${encodeURIComponent(modifiedInstrument.marqueId)}&type_id=${encodeURIComponent(modifiedInstrument.typeId)}&utilisation=${encodeURIComponent(modifiedInstrument.utilisation)}&cheminImage=${encodeURIComponent(modifiedInstrument.cheminImage)}`;

//         axios.post(apiUrl)
//             .then(response => {
//                 // Afficher un message de succès si la requête est réussie
//                 Alert.alert('Succès', 'L\'instrument a été modifié avec succès.');
//             })
//             .catch(error => {
//                 // En cas d'erreur, annuler les modifications locales et afficher un message d'erreur
//                 console.error('Error updating instrument:', error);
//                 this.setState({ instrumentsData: this.state.instrumentsData });
//                 Alert.alert('Erreur', 'Une erreur s\'est produite lors de la modification de l\'instrument. Les modifications locales ont été annulées. Veuillez réessayer.');
//             });
//     };
    

//     handleViewDetails = (id) => {
//         this.setState({ selectedInstrumentId: id });
//     };

//     handleDeleteInstrument = (id) => {
//         // Afficher une boîte de dialogue de confirmation avant la suppression
//         Alert.alert(
//             'Confirmation',
//             'Êtes-vous sûr de vouloir supprimer cet instrument ?',
//             [
//                 {
//                     text: 'Annuler',
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Supprimer',
//                     onPress: () => this.optimisticDeleteInstrument(id),
//                 },
//             ],
//             { cancelable: false }
//         );
//     };
    
//     optimisticDeleteInstrument = (id) => {
//         // Supprimer l'instrument localement avant d'envoyer la requête à l'API
//         const updatedInstrumentsData = this.state.instrumentsData.filter(item => item.id !== id);
//         this.setState({ instrumentsData: updatedInstrumentsData });
    
//         // Envoyer une requête de suppression à l'API
//         axios.delete(`http://api.holamama.fr/instrument/supprimer/${id}`)
//             .then(response => {
//                 Alert.alert('Succès', 'L\'instrument a été supprimé avec succès.');
//             })
//             .catch(error => {
//                 console.error('Error deleting instrument:', error);
//                 // Si la suppression échoue, annuler la suppression locale et revenir à l'état précédent
//                 this.setState({ instrumentsData: this.state.instrumentsData });
//                 Alert.alert('Erreur', 'Une erreur s\'est produite lors de la suppression de l\'instrument. Veuillez réessayer.');
//             });
//     };

//     render() {
//         const { instrumentsData, loading, error, editingInstrumentId, selectedInstrumentId } = this.state;

//         if (loading) {
//             return (
//                 <View style={styles.container}>
//                     <Text>Loading...</Text>
//                 </View>
//             );
//         }

//         if (error) {
//             return (
//                 <View style={styles.container}>
//                     <Text>{error}</Text>
//                 </View>
//             );
//         }

//         if (selectedInstrumentId) {
//             const selectedInstrument = instrumentsData.find(item => item.id === selectedInstrumentId);
//             return (
//                 <View style={styles.container}>
//                     <Text style={styles.instrumentName}>{selectedInstrument.nom}</Text>
//                     <Text>Marque: {selectedInstrument.marque.libelle}</Text>
//                     <Text>Type: {selectedInstrument.type.libelle}</Text>
//                     <Text>Numéro de série: {selectedInstrument.numSerie}</Text>
//                     <Text>Date d'achat: {new Date(selectedInstrument.dateAchat).toLocaleDateString('fr-FR')}</Text>
//                     <Text>Prix d'achat: {selectedInstrument.prixAchat}</Text>
//                     <Text>Utilisation: {selectedInstrument.utilisation}</Text>
//                     <TouchableOpacity onPress={() => this.setState({ selectedInstrumentId: null })}>
//                         <Text style={styles.editButton}>Retour</Text>
//                     </TouchableOpacity>
//                 </View>
//             );
//         }

//         return (
//             <View style={styles.container}>
//                 {editingInstrumentId ? (
//                     <InstrumentForm
//                         instrument={instrumentsData.find(item => item.id === editingInstrumentId)}
//                         onSave={this.handleSaveInstrument}
//                         onCancel={this.handleCancelEdit}
//                     />
//                 ) : (
//                     <FlatList
//                         data={instrumentsData}
//                         renderItem={({ item }) => (
//                             <View style={styles.instrumentItem}>
//                                 <Text style={styles.instrumentName}>{item.nom}</Text>
//                                 <Text>Marque: {item.marque.libelle}</Text>
//                                 <Text>Type: {item.type.libelle}</Text>
//                                 <Text>Numéro de série: {item.numSerie}</Text>
//                                 <Text>Date d'achat: {new Date(item.dateAchat).toLocaleDateString('fr-FR')}</Text>
//                                 <Text>Prix d'achat: {item.prixAchat}</Text>
//                                 <Text>Utilisation: {item.utilisation}</Text>
//                                 <TouchableOpacity onPress={() => this.handleEditInstrument(item.id)}>
//                                     <Text style={styles.editButton}>Modifier</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => this.handleViewDetails(item.id)}>
//                                     <Text style={styles.viewDetailsButton}>Voir détails</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => this.handleDeleteInstrument(item.id)}>
//                                     <Text style={styles.deleteButton}>Supprimer</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                         keyExtractor={(item, index) => index.toString()}
//                     />
//                 )}
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     instrumentItem: {
//         backgroundColor: '#f9c2ff',
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//     },
//     instrumentName: {
//         fontWeight: 'bold',
//     },
//     editButton: {
//         color: 'blue',
//         marginTop: 10,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
//     viewDetailsButton: {
//         color: 'green',
//         marginTop: 10,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
//     deleteButton: {
//         color: 'red',
//         marginTop: 10,
//         textAlign: 'center',
//         textDecorationLine: 'underline',
//     },
// });

// export default Instruments;

import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

class Instruments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataInstruments: [],
            showModifierModal: false,
            showAjouterModal: false,
            showConfirmationModal: false,
            instrumentToModify: null,
            nom: '',
            numSerie: '',
            prixAchat: '',
            dateAchat: '',
            marqueId: '',
            typeId: '',
            utilisation: '',
            cheminImage: '',
            typeInstruments: 1,
            typesInstruments: [],
            marque: 1,
            marques: [],
            
        };
    }

    componentDidMount() {
        this.fetchInstrumentsLister();
        this.fetchTypeInstrumentsLister();
        this.fetchMarquesLister();
    }
//recup infos instruments
    fetchInstrumentsLister = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/instrument/lister/');

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const jsonData = await response.json();
            this.setState({ dataInstruments: jsonData });
            console.log('success', jsonData);
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

//recup infos type d'instruments dans la liste déroulante
    fetchTypeInstrumentsLister = async () => {
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

//recup infos marques dans la liste déroulante
    fetchMarquesLister = async () => {
        try {
            const response = await fetch('http://api.holamama.fr/marque/lister');

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const jsonData = await response.json();
            this.setState({ marques: jsonData });
            console.log('success', jsonData);
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }


    // Remet à zero les varaibles
    fetchCancel = async () =>{
        // Fermer le formulaire et recharger la liste des Instruments
        this.setState({
            showModifierModal: false,
            showAjouterModal: false,
            showConfirmationModal: false,
            instrumentIdToDelete: null,
            nom: '',
            numSerie: '',
            prixAchat: '',
            dateAchat: '',
            marque: '',
            typeInstruments: '',
            utilisation: '',
            cheminImage: '',
        });

        await this.fetchInstrumentsLister(); // Recharger la liste des Instruments après la modification
    }


    // Ajout un Instrument
    fetchInstrumentAjouter = async () => {
        const {
            nom,
            numSerie,
            prixAchat,
            dateAchat,
            marque,
            typeInstruments,
            utilisation,
            cheminImage,
        } = this.state;

        try {
            const url = `http://api.holamama.fr/instrument/ajouter?nom=${nom}&num_serie=${numSerie}&prix_achat=${prixAchat}&date_achat=${dateAchat}&marque_id=${marque}&type_id=${typeInstruments}&utilisation=${utilisation}&cheminImage=${cheminImage}`;

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
            console.log('Instrument added successfully:', responseData);

            // Fermer le formulaire et recharger la liste des Instruments
            this.setState({
                showModifierModal: false,
                showAjouterModal: false,
                showConfirmationModal: false,
                instrumentToModify: null,
                nom: '',
                numSerie: '',
                prixAchat: '',
                dateAchat: '',
                marque: 1,
                typeInstruments: 1,
                utilisation: '',
                cheminImage: '',
            });

            await this.fetchInstrumentsLister(); // Recharger la liste des Instruments après la modification
        } catch (error) {
            console.error('Error adding Instrument:', error);
        }
    };

    // Supprime un Instrument
    fetchInstrumentDelete = async (id) => {
        try {
            const url = `http://api.holamama.fr/instrument/supprimer/${id}`;
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
                instrumentIdToDelete: null,
            });

            // Recharger la liste des instruments
            await this.fetchInstrumentsLister();
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

    // Modifier un Instrument
    fetchInstrumentModifier = async () => {
        const {
            instrumentToModify,
            nom,
            numSerie,
            prixAchat,
            dateAchat,
            marque,
            typeInstruments,
            utilisation,
            cheminImage,
        } = this.state;

        try {
            const url = `http://api.holamama.fr/instrument/modifier/${instrumentToModify}?nom=${nom}&num_serie=${numSerie}&prix_achat=${prixAchat}&date_achat=${dateAchat}&marque_id=${marque}&type_id=${typeInstruments}&utilisation=${utilisation}&cheminImage=${cheminImage}`;

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
            console.log('instrument updated successfully:', responseData);

            // Fermer le formulaire et recharger la liste des instruments
            this.setState({
                showModifierModal: false,
                instrumentToModify: null,
                nom: '',
                numSerie: '',
                prixAchat: '',
                dateAchat: '',
                marque: '',
                typeInstruments: '',
                utilisation: '',
                cheminImage: '',
            });

            await this.fetchInstrumentsLister(); // Recharger la liste des instruments après la modification
        } catch (error) {
            console.error('Error updating instrument:', error);
        }

        // Remet à zero les varaibles
        fetchCancel = async () =>{
            // Fermer le formulaire et recharger la liste des instruments
            this.setState({
                showAjouterModal: false,
                showModifierModal: false,
                instrumentToModify: null,
                nom: '',
                numSerie: '',
                prixAchat: '',
                dateAchat: '',
                marque: '',
                typeInstruments: '',
                utilisation: '',
                cheminImage: '',
            });

            await this.fetchInstrumentsLister(); // Recharger la liste des instruments après la modification
        }
    };


    render() {
        const getFormattedTime = (dateTimeString) => {
            return dateTimeString[0] +dateTimeString[1] + dateTimeString[2] + dateTimeString[3] + dateTimeString[4] + dateTimeString[5] + dateTimeString[6] + dateTimeString[7] + dateTimeString[8] + dateTimeString[9];
        };

        return (
            <View style={styles.container}>
                {/*Bouton flotant ajouter*/}
                <TouchableOpacity
                    style={{
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
                        }}
                    >+</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.dataInstruments}
                    renderItem={({ item }) => (
                        <View style={styles.InstrumentItem}>
                            <Text style={styles.nomPrenom}>{item.nom}</Text>
                            <Text>N° Série: {item.numSerie}</Text>
                            <Text>Marque: {item.marque.libelle}</Text>
                            <Text>Type d'instrument: {item.type.libelle}</Text>
                            <Text>Prix: {item.prixAchat}</Text>
                            <Text>Date d'achat: {getFormattedTime(item.dateAchat)}</Text>
                            <Text>Utilisation: {item.utilisation}</Text>
                            <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={[styles.button, {width: '45%', marginBottom: 0, marginTop: 10}]}
                                    onPress={() =>
                                        this.setState({
                                            showModifierModal: true,
                                            instrumentToModify: item.id,
                                            nom: item.nom,
                                            numSerie: item.numSerie,
                                            prixAchat: item.prixAchat,
                                            dateAchat: getFormattedTime(item.dateAchat),
                                            marque: item.marque.id,
                                            typeInstruments: item.type.id,
                                            utilisation: item.utilisation,
                                            cheminImage: item.cheminImage,
                                        })
                                    }
                                >
                                    <Text style={styles.buttonText}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, {width: '45%', marginBottom: 0, marginTop: 10}]}
                                    onPress={() => {
                                        this.setState({ showConfirmationModal: true, instrumentIdToDelete: item.id, nom: item.nom});
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
                            {this.state.nom}
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            Êtes-vous sûr de vouloir supprimer cette instrument ?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%' }}>
                            <Button
                                title="Oui"
                                onPress={() => {
                                    this.fetchInstrumentDelete(this.state.instrumentIdToDelete);
                                }}
                            />
                            <Button
                                title="Non"
                                onPress={() => {
                                    this.setState({ showConfirmationModal: false, instrumentIdToDelete: null, nom: ''});
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                {/* Modal pour le formulaire d'ajout d'instrument */}
                <Modal
                    visible={this.state.showAjouterModal}
                    transparent={true}
                    animationType="slide"
                >

                    <ScrollView contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Ajouter un instrument :</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nom :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom"
                                value={this.state.nom}
                                onChangeText={(text) => this.setState({ nom: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>N° Série :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="N° Série"
                                value={this.state.numSerie}
                                onChangeText={(text) => this.setState({ numSerie: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Prix d'achat :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Prix d'achat"
                                value={this.state.prixAchat}
                                onChangeText={(text) => this.setState({ prixAchat: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date d'achat :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Date d'achat (AAAA-MM-JJ)"
                                value={this.state.dateAchat}
                                onChangeText={(text) => this.setState({ dateAchat: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Marque :</Text>
                            <Picker
                                selectedValue={this.state.marque}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ marque: itemValue })
                                }
                            >
                                {this.state.marques.map((marque) => (
                                    <Picker.Item
                                        key={marque.id}
                                        label={marque.libelle}
                                        value={marque.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Type d'instrument:</Text>
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
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Utilisation :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Utilisation"
                                value={this.state.utilisation}
                                onChangeText={(text) => this.setState({ utilisation: text })}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.fetchInstrumentAjouter}
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

                {/* Modal pour le formulaire de modification d'Instrument */}
                <Modal
                    visible={this.state.showModifierModal}
                    transparent={true}
                    animationType="slide"
                >

                    <ScrollView contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Modifier un instrument :</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nom :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom"
                                value={this.state.nom}
                                onChangeText={(text) => this.setState({ nom: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>N° Série :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="N° Série"
                                value={this.state.numSerie}
                                onChangeText={(text) => this.setState({ numSerie: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Prix d'achat :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Prix d'achat"
                                value={this.state.prixAchat}
                                onChangeText={(text) => this.setState({ prixAchat: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date d'achat :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Date d'achat (AAAA-MM-JJ)"
                                value={this.state.dateAchat}
                                onChangeText={(text) => this.setState({ dateAchat: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Marque :</Text>
                            <Picker
                                selectedValue={this.state.marque}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ marque: itemValue })
                                }
                            >
                                {this.state.marques.map((marque) => (
                                    <Picker.Item
                                        key={marque.id}
                                        label={`${marque.libelle}`}
                                        value={marque.id}
                                    />
                                ))}
                            </Picker>
                        </View>
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
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Utilisation :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Utilisation"
                                value={this.state.utilisation}
                                onChangeText={(text) => this.setState({ utilisation: text })}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.fetchInstrumentModifier}
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
    instrumentItem: {
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
});

export default Instruments;
