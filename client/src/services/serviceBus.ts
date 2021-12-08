import axios from 'axios';
import { configuration } from '../core';

const queueChange = async (message: any): Promise<{ operation_id: string }> => {
    const { data } = await axios
        .post<{ operation_id: string }>(configuration.serviceBus.topicEndpoint, message)
    //.then(({ data }) => console.log('message published successfully'))
    //.catch(console.error)
    return data;
}

export { queueChange }
