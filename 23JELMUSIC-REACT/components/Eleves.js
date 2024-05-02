import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Button} from 'react-native';
import {Picker} from "@react-native-picker/picker";

class Eleves extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataEleves: [],
            showModifierModal: false,
            showAjouterModal: false,
            showConfirmationModal: false,
            nom: 'HERVIEU',
            prenom: 'Noä',
            numRue: '10',
            rue: 'Boulevard marechal juin',
            copos: '14000',
            ville: 'Caen',
            tel: '0123456789',
            mail: 'hervieu.noa@gmail.com',
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

    // Remet à zero les varaibles
    fetchCancel = async () =>{
        // Fermer le formulaire et recharger la liste des eleves
        this.setState({
            showModifierModal: false,
            showAjouterModal: false,
            showConfirmationModal: false,
            eleveIdToDelete: null,
            nom: '',
            prenom: '',
            numRue: '',
            rue: '',
            copos: '',
            ville: '',
            tel: '',
            mail: '',
        });

        await this.fetchElevesLister(); // Recharger la liste des eleves après la modification
    }


    // Ajout un eleve
    fetchEleveAjouter = async () => {
        const {
            nom,
            prenom,
            numRue,
            rue,
            copos,
            ville,
            tel,
            mail,
        } = this.state;

        try {
            const url = `http://api.holamama.fr/eleve/ajouter?nom=${nom}&prenom=${prenom}&num_rue=${numRue}&rue=${rue}&copos=${copos}&ville=${ville}&tel=${tel}&mail=${mail}`;

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
            console.log('Eleve added successfully:', responseData);

            // Fermer le formulaire et recharger la liste des eleves
            this.setState({
                showModifierModal: false,
                showAjouterModal: false,
                showConfirmationModal: false,
                nom: '',
                prenom: '',
                numRue: '',
                rue: '',
                copos: '',
                ville: '',
                tel: '',
                mail: '',
            });

            await this.fetchElevesLister(); // Recharger la liste des eleves après la modification
        } catch (error) {
            console.error('Error adding eleve:', error);
        }
    };

    // Supprime un eleve
    fetchEleveDelete = async (id) => {
        try {
            const url = `http://api.holamama.fr/eleve/supprimer/${id}`;
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
                eleveIdToDelete: null,
            });

            // Recharger la liste des eleves
            await this.fetchElevesLister();
        } catch (error) {
            console.warn('Error fetching data:', error.message);
        }
    }

    // Modifier un eleve
    fetchEleveModifier = async () => {
        const {
            eleveToModify,
            nom,
            prenom,
            numRue,
            rue,
            copos,
            ville,
            tel,
            mail,
        } = this.state;

        try {
            const url = `http://api.holamama.fr/eleve/modifier/${eleveToModify}?nom=${nom}&prenom=${prenom}&num_rue=${numRue}&rue=${rue}&copos=${copos}&ville=${ville}&tel=${tel}&mail=${mail}`;

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
            console.log('Eleve updated successfully:', responseData);

            // Fermer le formulaire et recharger la liste des eleve
            this.setState({
                showModifierModal: false,
                showAjouterModal: false,
                showConfirmationModal: false,
                nom: '',
                prenom: '',
                numRue: '',
                rue: '',
                copos: '',
                ville: '',
                tel: '',
                mail: '',
            });

            await this.fetchElevesLister(); // Recharger la liste des eleve après la modification
        } catch (error) {
            console.error('Error updating eleve:', error);
        }
    };


    render() {

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

                                    }}
                                >
                                    <Text style={styles.buttonText}>Contrats</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, {width: '30%', marginBottom: 0, marginTop: 10}]}
                                    onPress={() =>
                                        this.setState({
                                            showModifierModal: true,
                                            eleveToModify: item.id,
                                            nom: item.nom,
                                            prenom: item.prenom,
                                            numRue: item.numRue,
                                            rue: item.rue,
                                            copos: item.copos,
                                            ville: item.ville,
                                            tel: item.tel,
                                            mail: item.mail,
                                        })
                                    }
                                >
                                    <Text style={styles.buttonText}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, {width: '30%', marginBottom: 0, marginTop: 10}]}
                                    onPress={() => {
                                        this.setState({ showConfirmationModal: true, eleveIdToDelete: item.id, nom: item.nom, prenom: item.prenom });
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
                            {this.state.nom} {this.state.prenom}
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            Êtes-vous sûr de vouloir supprimer cette élève ?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%' }}>
                            <Button
                                title="Oui"
                                onPress={() => {
                                    this.fetchEleveDelete(this.state.eleveIdToDelete);
                                }}
                            />
                            <Button
                                title="Non"
                                onPress={() => {
                                    this.setState({ showConfirmationModal: false, eleveIdToDelete: null, nom: '', prenom: '' });
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                {/* Modal pour le formulaire d'ajout d'eleve */}
                <Modal
                    visible={this.state.showAjouterModal}
                    transparent={true}
                    animationType="slide"
                >

                    <ScrollView contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Ajouter un élève :</Text>
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
                            <Text style={styles.label}>Prénom :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Prénom"
                                value={this.state.prenom}
                                onChangeText={(text) => this.setState({ prenom: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>N°Rue :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="N°Rue"
                                value={this.state.numRue}
                                onChangeText={(text) => this.setState({ numRue: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Rue :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Rue"
                                value={this.state.rue}
                                onChangeText={(text) => this.setState({ rue: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Code postal :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Code postal"
                                value={this.state.copos}
                                onChangeText={(text) => this.setState({ copos: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Ville :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ville"
                                value={this.state.ville}
                                onChangeText={(text) => this.setState({ ville: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Téléphone :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Téléphone"
                                value={this.state.tel}
                                onChangeText={(text) => this.setState({ tel: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mail :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Mail"
                                value={this.state.mail}
                                onChangeText={(text) => this.setState({ mail: text })}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.fetchEleveAjouter}
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

                {/* Modal pour le formulaire de modification d'eleve */}
                <Modal
                    visible={this.state.showModifierModal}
                    transparent={true}
                    animationType="slide"
                >

                    <ScrollView contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Modifier un élève :</Text>
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
                            <Text style={styles.label}>Prénom :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Prénom"
                                value={this.state.prenom}
                                onChangeText={(text) => this.setState({ prenom: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>N°Rue :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="N°Rue"
                                value={this.state.numRue}
                                onChangeText={(text) => this.setState({ numRue: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Rue :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Rue"
                                value={this.state.rue}
                                onChangeText={(text) => this.setState({ rue: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Code postal :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Code postal"
                                value={this.state.copos}
                                onChangeText={(text) => this.setState({ copos: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Ville :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ville"
                                value={this.state.ville}
                                onChangeText={(text) => this.setState({ ville: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Téléphone :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Téléphone"
                                value={this.state.tel}
                                onChangeText={(text) => this.setState({ tel: text })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mail :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Mail"
                                value={this.state.mail}
                                onChangeText={(text) => this.setState({ mail: text })}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.fetchEleveModifier}
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

export default Eleves;