import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import axios from "axios";

class ContratsPrets extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            contratsPretsData: [],
            loading: true,
            error: null,
            editingContratPretId: null,
            selectedContratPretId: null,
        };
    }

    componentDidMount() {
        this.fetchContratsPretsData();
    }

    fetchContratsPretsData = () => {
        axios.get('https://vps.holamama.fr/contratPret/lister')
            .then(response => {
                this.setState({
                    contratsPretsData: response.data,
                    loading: false,
                    error: null,
                });
            })
            .catch(error => {
                console.error('Error fetching contratsPrets data:', error);
                this.setState({
                    loading: false,
                    error: 'Failed to fetch contratsPrets data. Please try again later.',
                });
            });
    };

    handleEditContratPret = (id) => {
        this.setState({ editingContratPretId: id });
    };

    handleCancelEdit = () => {
        this.setState({ editingContratPretId: null});
    };

    handleViewDetails = (id) => {
        this.setState({ selectedContratPretId: id });
    };

    handleDeleteContratPret = (id) => {
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
                    onPress: () => this.confirmDeleteContratPret(id),
                },
            ],
            { cancelable: false }
        );
    };

    confirmDeleteContratPret = (id) => {
        axios.delete(`https://vps.holamama.fr/contratPret/supprimer/${id}`)
            .then(response => {
                this.setState(prevState => ({
                    contratsPretsData: prevState.contratsPretsData.filter(item => item.id !== id),
                    selectedContratPretId: id,
                }));
                Alert.alert('Succès', 'Le contrat de prêt a été supprimé avec succès.');
            })
            .catch((error => {
                console.error('Error deleting Contrat Pret:', error);
                Alert.alert('Erreur', 'une erreur s\'est produite lors de la suppresion de l\'instrument. Veuillez réessayer');
            }));
    };

    render() {
        const {instrumentsData, loading, error, editingInstrumentId, selectedInstrumentId} = this.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if(selectedContratPretId){
            const selectedContratPret = contratsPretsData.find(item => item.id === selectedContratPretId);
            return(
                <View style={styles.container}>
                    <Text>Date de début du contrat: {new Date(selectedContratPret.dateDebut).toLocaleDateString('fr-FR')}</Text>
                    <Text>Date de fin du contrat: {new Date(selectedContratPret.dateFin).toLocaleDateString('fr-FR')}</Text>
                    <Text>Attestation d'assurance: {selectedContratPret.attestationAssurance}</Text>
                    <Text>Etat Instrument au début du contrat {selectedContratPret.etatDetailDebut}</Text>
                    <Text>Etat Instrument à la fin du contrat {selectedContratPret.etatDetailFin}</Text>
                    <Text>Eleve: {selectedContratPret.eleve.map(eleve => eleve.nom).join(', ')}</Text>
                    <TouchableOpacity onPress={() => this.setState({ selectedInstrumentId: null })}>
                        <Text style={styles.editButton}>Retour</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (

        )
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

export default ContratsPrets;