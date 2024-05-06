import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

class InstrumentForm extends React.Component {
    constructor(props) {
        super(props);
        const { instrument, marques, types } = props;
        this.state = {
            id: instrument.id,
            nom: instrument.nom,
            numSerie: instrument.numSerie.toString(),
            prixAchat: instrument.prixAchat.toString(),
            utilisation: instrument.utilisation,
            cheminImage: instrument.cheminImage,
            marqueId: instrument.marque.id.toString(),
            typeId: instrument.type.id.toString(),
            marques: marques,
            types: types,
        };
    }

    handleInputChange = (fieldName, value) => {
        this.setState({ [fieldName]: value });
    };

    saveChanges = () => {
        const { onSave } = this.props;
        onSave(this.state);
    };

    render() {
        const { onCancel } = this.props;
        const { marques, types, marqueId, typeId } = this.state;

        console.log('marques:', marques);
        console.log('types:', types);
        console.log('marqueId:', marqueId);
        console.log('typeId:', typeId);

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
                    placeholder="Numéro de série"
                    value={this.state.numSerie}
                    onChangeText={(text) => this.handleInputChange('numSerie', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Prix d'achat"
                    value={this.state.prixAchat}
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
                    placeholder="Chemin de l'image"
                    value={this.state.cheminImage}
                    onChangeText={(text) => this.handleInputChange('cheminImage', text)}
                />
                <Picker
                    selectedValue={marqueId}
                    style={styles.select}
                    onValueChange={(itemValue) => this.handleInputChange('marqueId', itemValue)}>
                    {marques && marques.map((marque) => (
                        <Picker.Item key={marque.id} label={marque.libelle} value={marque.id.toString()} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={typeId}
                    style={styles.select}
                    onValueChange={(itemValue) => this.handleInputChange('typeId', itemValue)}>
                    {types && types.map((type) => (
                        <Picker.Item key={type.id} label={type.libelle} value={type.id.toString()} />
                    ))}
                </Picker>
                <Button title="Enregistrer" onPress={this.saveChanges} />
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
    select: {
        height: 40,
        width: '80%',
        marginBottom: 10,
    },
});

export default InstrumentForm;
