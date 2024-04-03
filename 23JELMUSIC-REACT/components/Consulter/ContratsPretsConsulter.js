import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getContratsPretsById } from '../../API/DataContratPrets';

const ContratsPretsConsulter = ({ entityId }) => {
    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntity = async () => {
            try {
                const fetchedEntity = await getContratsPretsById(entityId);
                setEntity(fetchedEntity);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching entity details:', error);
                setLoading(false);
            }
        };

        fetchEntity();
    }, [entityId]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!entity) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Entity not found</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details du contrat de prêt :</Text>
            <Text>ID: {entity.id}</Text>
            <Text>Name: {entity.name}</Text>
            {/* Affichez d'autres détails de l'entité selon votre structure de données */}
        </View>
    );
};

export default ContratsPretsConsulter;