import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


class ContratPretForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dateDebut: props.contratItem.dateDebut,
            dateFin: props.contratItem.dateFin,
            attestationAssurance: props.contratItem.attestationAssurance,
            etatDetailDebut: props.contratItem.etatDetailDebut,
            etatDetailFin: props.contratItem.etatDetailFin,
            eleve: props.contratItem.eleve.map(eleve => eleve.nom).join(', '),
        };
    }

    handleInputChange = (fieldName, value) => {
        this.setState({ [fieldName]: value });
    };

    render(){
        const { onSave, onCancel } = this.props;

        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Date de début"
                    value={new Date(this.state.dateDebut.toString()).toLocaleDateString('fr-FR')}
                    onChangeText={(text) => this.handleInputChange('dateDebut', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date de fin"
                    value={new Date(this.state.dateFin.toString()).toLocaleDateString('fr-FR')}
                    onChangeText={(text) => this.handleInputChange('dateFin', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Attestation d'assurance"
                    value={this.state.attestationAssurance}
                    onChangeText={(text) => this.handleInputChange('attestationAssurance', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Etat Instrument au début du contrat"
                    value={this.state.etatDetailDebut}
                    onChangeText={(text) => this.handleInputChange('etatDetailDebut', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Etat Instrument à la fin du contrat"
                    value={this.state.etatDetailFin}
                    onChangeText={(text) => this.handleInputChange('etatDetailFin', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Eleve"
                    value={this.state.eleve}
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

export default ContratPretForm;