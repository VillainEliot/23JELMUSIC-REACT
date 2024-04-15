import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

class InstrumentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: props.instrument.nom,
            marque: props.instrument.marque.libelle,
            type: props.instrument.type.libelle,
            numSerie: props.instrument.numSerie,
            dateAchat: props.instrument.dateAchat,
            prixAchat: props.instrument.prixAchat,
            utilisation: props.instrument.utilisation,
            accessoires: props.instrument.accessoires.map(accessoire => accessoire.libelle).join(', '),
            couleurs: props.instrument.couleurs.map(couleur => couleur.nom).join(', '),
        };
    }

    handleInputChange = (fieldName, value) => {
        this.setState({ [fieldName]: value });
    };

    render() {
        const { onSave, onCancel } = this.props;

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    value={this.state.nom}
                    onChangeText={(text) => this.handleInputChange('nom', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Marque"
                    value={this.state.marque}
                    onChangeText={(text) => this.handleInputChange('marque', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type"
                    value={this.state.type}
                    onChangeText={(text) => this.handleInputChange('type', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Numéro de série"
                    value={this.state.numSerie.toString()}
                    onChangeText={(text) => this.handleInputChange('numSerie', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date d'achat"
                    value={new Date(this.state.dateAchat.toString()).toLocaleDateString('fr-FR')}
                    onChangeText={(text) => this.handleInputChange('dateAchat', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Prix d'achat"
                    value={this.state.prixAchat.toString()}
                    onChangeText={(text) => this.handleInputChange('prixAchat', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Utilisation"
                    value={this.state.utilisation}
                    onChangeText={(text) => this.handleInputChange('utilisation', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Accessoires"
                    value={this.state.accessoires}
                    onChangeText={(text) => this.handleInputChange('accessoires', text)}
                />
                <Button title="Enregistrer" onPress={() => onSave(this.state)} />
                <Button title="Annuler" onPress={onCancel} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default InstrumentForm;
