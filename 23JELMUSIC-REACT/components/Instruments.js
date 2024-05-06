import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import InstrumentForm from './InstrumentForm'; // Importer le composant du formulaire de modification

class Instruments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instrumentsData: [],
            loading: true,
            error: null,
            editingInstrumentId: null, // Ajouter un état pour suivre l'ID de l'instrument en cours de modification
            selectedInstrumentId: null, // Ajouter un état pour suivre l'ID de l'instrument sélectionné pour les détails
        };
    }

    componentDidMount() {
        this.fetchInstrumentsData();
    }

    fetchInstrumentsData = () => {
        axios.get('http://192.168.34.166/23JELMUSIC_API/public/instrument/lister')
            .then(response => {
                this.setState({
                    instrumentsData: response.data,
                    loading: false,
                    error: null,
                });
            })
            .catch(error => {
                console.error('Error fetching instruments data:', error);
                this.setState({
                    loading: false,
                    error: 'Failed to fetch instruments data. Please try again later.',
                });
            });
    };

    handleEditInstrument = (id) => {
        this.setState({ editingInstrumentId: id });
    };

    handleCancelEdit = () => {
        this.setState({ editingInstrumentId: null });
    };

    handleSaveInstrument = (modifiedInstrument) => {
        const { id } = modifiedInstrument;
    
        // Mettre à jour localement les données de l'instrument modifié
        const updatedInstrumentsData = this.state.instrumentsData.map(item => {
            if (item.id === id) {
                return modifiedInstrument;
            }
            return item;
        });
        this.setState({ instrumentsData: updatedInstrumentsData, editingInstrumentId: null });
        
        // Construire l'URL de l'API pour la modification de l'instrument
        const apiUrl = `http://192.168.34.166/23JELMUSIC_API/public/instrument/modifier/${id}?nom=${encodeURIComponent(modifiedInstrument.nom)}&num_serie=${encodeURIComponent(modifiedInstrument.numSerie)}&prix_achat=${encodeURIComponent(modifiedInstrument.prixAchat)}&marque_id=${encodeURIComponent(modifiedInstrument.marqueId)}&type_id=${encodeURIComponent(modifiedInstrument.typeId)}&utilisation=${encodeURIComponent(modifiedInstrument.utilisation)}&cheminImage=${encodeURIComponent(modifiedInstrument.cheminImage)}`;

        axios.post(apiUrl)
            .then(response => {
                // Afficher un message de succès si la requête est réussie
                Alert.alert('Succès', 'L\'instrument a été modifié avec succès.');
            })
            .catch(error => {
                // En cas d'erreur, annuler les modifications locales et afficher un message d'erreur
                console.error('Error updating instrument:', error);
                this.setState({ instrumentsData: this.state.instrumentsData });
                Alert.alert('Erreur', 'Une erreur s\'est produite lors de la modification de l\'instrument. Les modifications locales ont été annulées. Veuillez réessayer.');
            });
    };
    

    handleViewDetails = (id) => {
        this.setState({ selectedInstrumentId: id });
    };

    handleDeleteInstrument = (id) => {
        // Afficher une boîte de dialogue de confirmation avant la suppression
        Alert.alert(
            'Confirmation',
            'Êtes-vous sûr de vouloir supprimer cet instrument ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Supprimer',
                    onPress: () => this.optimisticDeleteInstrument(id),
                },
            ],
            { cancelable: false }
        );
    };
    
    optimisticDeleteInstrument = (id) => {
        // Supprimer l'instrument localement avant d'envoyer la requête à l'API
        const updatedInstrumentsData = this.state.instrumentsData.filter(item => item.id !== id);
        this.setState({ instrumentsData: updatedInstrumentsData });
    
        // Envoyer une requête de suppression à l'API
        axios.delete(`http://192.168.34.166/23JELMUSIC_API/public/instrument/supprimer/${id}`)
            .then(response => {
                Alert.alert('Succès', 'L\'instrument a été supprimé avec succès.');
            })
            .catch(error => {
                console.error('Error deleting instrument:', error);
                // Si la suppression échoue, annuler la suppression locale et revenir à l'état précédent
                this.setState({ instrumentsData: this.state.instrumentsData });
                Alert.alert('Erreur', 'Une erreur s\'est produite lors de la suppression de l\'instrument. Veuillez réessayer.');
            });
    };

    render() {
        const { instrumentsData, loading, error, editingInstrumentId, selectedInstrumentId } = this.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>{error}</Text>
                </View>
            );
        }

        if (selectedInstrumentId) {
            const selectedInstrument = instrumentsData.find(item => item.id === selectedInstrumentId);
            return (
                <View style={styles.container}>
                    <Text style={styles.instrumentName}>{selectedInstrument.nom}</Text>
                    <Text>Marque: {selectedInstrument.marque.libelle}</Text>
                    <Text>Type: {selectedInstrument.type.libelle}</Text>
                    <Text>Numéro de série: {selectedInstrument.numSerie}</Text>
                    <Text>Date d'achat: {new Date(selectedInstrument.dateAchat).toLocaleDateString('fr-FR')}</Text>
                    <Text>Prix d'achat: {selectedInstrument.prixAchat}</Text>
                    <Text>Utilisation: {selectedInstrument.utilisation}</Text>
                    <TouchableOpacity onPress={() => this.setState({ selectedInstrumentId: null })}>
                        <Text style={styles.editButton}>Retour</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {editingInstrumentId ? (
                    <InstrumentForm
                        instrument={instrumentsData.find(item => item.id === editingInstrumentId)}
                        onSave={this.handleSaveInstrument}
                        onCancel={this.handleCancelEdit}
                    />
                ) : (
                    <FlatList
                        data={instrumentsData}
                        renderItem={({ item }) => (
                            <View style={styles.instrumentItem}>
                                <Text style={styles.instrumentName}>{item.nom}</Text>
                                <Text>Marque: {item.marque.libelle}</Text>
                                <Text>Type: {item.type.libelle}</Text>
                                <Text>Numéro de série: {item.numSerie}</Text>
                                <Text>Date d'achat: {new Date(item.dateAchat).toLocaleDateString('fr-FR')}</Text>
                                <Text>Prix d'achat: {item.prixAchat}</Text>
                                <Text>Utilisation: {item.utilisation}</Text>
                                <TouchableOpacity onPress={() => this.handleEditInstrument(item.id)}>
                                    <Text style={styles.editButton}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleViewDetails(item.id)}>
                                    <Text style={styles.viewDetailsButton}>Voir détails</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleDeleteInstrument(item.id)}>
                                    <Text style={styles.deleteButton}>Supprimer</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
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
    editButton: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    viewDetailsButton: {
        color: 'green',
        marginTop: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    deleteButton: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default Instruments;
